const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const Request=require("./models/request.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Timetable');
}

// GET /requests/:owner - Fetch all requests for a specific owner
app.get("/requests/:owner", async (req, res) => {
  const { owner } = req.params;

  try {
    const request = await Request.findOne({ owner })
      .populate("owner") // Populate owner's basic info
      .populate("pending.from") // Populate sender of pending request
      .populate("accepted.from") // Populate sender of accepted request
      .populate("rejected.to") // Populate recipient of rejected request
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
app.post("/requests/:from/:to", async (req, res) => {
  try {
    const { from, to } = req.params;
    const pendingEntry = req.body; // ✅ You need this!

    // Add request to sender's pending list
    const updatedOwnerPending = await Request.findOneAndUpdate(
      { owner: from },
      { $push: { pending: pendingEntry } },
      { new: true, runValidators: true }
    )
      .populate("owner")
      .populate("pending.from")
      .populate("accepted.from")
      .populate("rejected.to")
      .lean();

    // Add same request to recipient's pending list
    const updatedRecipientPending = await Request.findOneAndUpdate(
      { owner: to }, // ✅ Fixed: update recipient
      { $push: { pending: pendingEntry } },
      { new: true, runValidators: true }
    )
      .populate("owner")
      .populate("pending.from")
      .populate("accepted.from")
      .populate("rejected.to")
      .lean();

    res.status(200).json({
      message: "Swap request created successfully.",
      owner: updatedOwnerPending,
      receiver: updatedRecipientPending
    });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: "Server error creating request." });
  }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})  
