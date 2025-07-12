const express = require("express");
const router = express.Router();
const Request = require("../models/request.js");

//REQUEST

// GET /requests/:owner - Fetch all requests for a specific owner
router.get("/:owner", async (req, res) => {
  const { owner } = req.params;

  try {
    const request = await Request.findOne({ owner })
      .populate("owner") // Populate owner's basic info
      .populate("pending.receiver") // Populate sender of pending request
      .populate("accepted.receiver") // Populate sender of accepted request
      .populate("rejected.receiver") // Populate recipient of rejected request
      .lean();

    if (!request) {
      return res.status(404).json({ message: "No request found for this owner." });
    }

    res.status(200).json({
      owner: request.owner,
      pending: request.pending || null,
      accepted: request.accepted || null,
      rejected: request.rejected || null,
    });
  } catch (err) {
    console.error("Error fetching request:", err);
    res.status(500).json({ message: "Server error fetching request data." });
  }
});


//Adding newly made request to owner and recevier pending list
router.post("/:from/:to", async (req, res) => {
  try {
    const { from, to } = req.params;
    const pendingEntry = req.body;

    // Generate shared _id
    const sharedPendingId = new mongoose.Types.ObjectId();

    // Create copies for owner and receiver with the same _id
    const ownerEntry = { ...pendingEntry, isSent: true, _id: sharedPendingId };
    const receiverEntry = { ...pendingEntry, isSent: false, _id: sharedPendingId };

    // Add request to sender's pending list
    const updatedOwnerPending = await Request.findOneAndUpdate(
      { owner: from },
      { $push: { pending: ownerEntry } },
      { new: true, runValidators: true, upsert: true }
    )
      .populate("owner")
      .populate("pending.receiver")
      .populate("accepted.receiver")
      .populate("rejected.receiver")
      .lean();

    // Add request to receiver's pending list
    const updatedRecipientPending = await Request.findOneAndUpdate(
      { owner: to },
      { $push: { pending: receiverEntry } },
      { new: true, runValidators: true, upsert: true }
    )
      .populate("owner")
      .populate("pending.receiverreceiver")
      .populate("accepted.receiverreceiver")
      .populate("rejected.receiverreceiver")
      .lean();

    res.status(200).json({
      message: "Swap request created successfully.",
      sharedId: sharedPendingId,
      owner: updatedOwnerPending,
      receiver: updatedRecipientPending
    });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: "Server error creating request." });
  }
});

//Owner accepts the pending request
router.patch("/:from/:to/:pending/accept", async (req, res) => {
  try {
    const { from, to, pending } = req.params;

    // Step 1: Fetch the owner's document to find the pending entry
    const ownerDoc = await Request.findOne({ owner: from });
    const receiverDoc = await Request.findOne({ owner: to });

    if (!ownerDoc || !receiverDoc) {
      return res.status(404).json({ message: "Owner or receiver not found." });
    }

    // Step 2: Find the specific pending entry by _id from both
    const ownerPendingEntry = ownerDoc.pending.id(pending);
    const receiverPendingEntry = receiverDoc.pending.id(pending);

    if (!ownerPendingEntry || !receiverPendingEntry) {
      return res.status(404).json({ message: "Pending entry not found for one or both users." });
    }

    // Step 3: Remove from pending
    ownerDoc.pending.id(pending).remove();
    receiverDoc.pending.id(pending).remove();

    // Step 4: Push to accepted array
    ownerDoc.accepted.push(ownerPendingEntry);
    receiverDoc.accepted.push(receiverPendingEntry);

    // Step 5: Save both documents
    await ownerDoc.save();
    await receiverDoc.save();

    // Step 6: Re-populate and return updated documents
    const updatedOwner = await Request.findOne({ owner: from })
      .populate("owner")
      .populate("pending.receiver")
      .populate("accepted.receiver")
      .populate("rejected.receiver")
      .lean();

    const updatedReceiver = await Request.findOne({ owner: to })
      .populate("owner")
      .populate("pending.receiver")
      .populate("accepted.receiver")
      .populate("rejected.receiver")
      .lean();

    res.status(200).json({
      message: "Pending request moved to accepted.",
      owner: updatedOwner,
      receiver: updatedReceiver
    });
  } catch (err) {
    console.error("Error moving request to accepted:", err);
    res.status(500).json({ message: "Server error moving request." });
  }
});

//Owner rejects the pending request
router.patch("/:from/:to/:pending/reject", async (req, res) => {
  try {
    const { from, to, pending } = req.params;

    // Step 1: Fetch the owner's document to find the pending entry
    const ownerDoc = await Request.findOne({ owner: from });
    const receiverDoc = await Request.findOne({ owner: to });

    if (!ownerDoc || !receiverDoc) {
      return res.status(404).json({ message: "Owner or receiver not found." });
    }

    // Step 2: Find the specific pending entry by _id from both
    const ownerPendingEntry = ownerDoc.pending.id(pending);
    const receiverPendingEntry = receiverDoc.pending.id(pending);

    if (!ownerPendingEntry || !receiverPendingEntry) {
      return res.status(404).json({ message: "Pending entry not found for one or both users." });
    }

    // Step 3: Remove from pending
    ownerDoc.pending.id(pending).remove();
    receiverDoc.pending.id(pending).remove();

    // Step 4: Push to accepted array
    ownerDoc.rejected.push(ownerPendingEntry);

    // Step 5: Save both documents
    await ownerDoc.save();
    await receiverDoc.save();

    // Step 6: Re-populate and return updated documents
    const updatedOwner = await Request.findOne({ owner: from })
      .populate("owner")
      .populate("pending.receiver")
      .populate("accepted.receiver")
      .populate("rejected.receiver")
      .lean();

    const updatedReceiver = await Request.findOne({ owner: to })
      .populate("owner")
      .populate("pending.receiver")
      .populate("accepted.receiver")
      .populate("rejected.receiver")
      .lean();

    res.status(200).json({
      message: "Pending request moved to accepted.",
      owner: updatedOwner,
      receiver: updatedReceiver
    });
  } catch (err) {
    console.error("Error moving request to accepted:", err);
    res.status(500).json({ message: "Server error moving request." });
  }
});

module.exports = router;