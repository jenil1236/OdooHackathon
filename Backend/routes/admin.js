const User = require('../models/user');
const Request = require('../models/request');
const router = express.Router();

const { setAdmin, isAdmin } = require("../middleware/admin");

router.get('/', setAdmin, (req, res) => {
    res.redirect('/admin/dashboard');
})

router.get('/dashboard', isAdmin, async (req, res) => {
    const users = await User.find();
    const requests = await Request.find()
        .populate({ path: 'pending.receiver', select: 'fullName' })
        .populate({ path: 'accepted.receiver', select: 'fullName' })
        .populate({ path: 'rejected.receiver', select: 'fullName' })
        .populate({ path: 'owner', select: 'fullName' });
    const totalUsers = await User.countDocuments();
    let pendingRequests = 0, acceptedRequests = 0, rejectedRequests = 0;
    const swaps = [];
    for (const request of requests) {
        const user1 = request.owner;
        for (const item of request.pending) {
            const user2 = item.receiver;
            const status = 'pending';
            const skill1 = item.offers;
            const skill2 = item.wants;
            const swap = {
                user1,
                user2,
                status,
                skill1,
                skill2
            }
            swaps.push(swap);
        }
        for (const item of request.accepted) {
            const user2 = item.receiver;
            const status = 'accepted';
            const skill1 = item.offers;
            const skill2 = item.wants;
            const swap = {
                user1,
                user2,
                status,
                skill1,
                skill2
            }
            swaps.push(swap);
        }
        for (const item of request.rejected) {
            const user2 = item.receiver;
            const status = 'rejected';
            const skill1 = item.offers;
            const skill2 = item.wants;
            const swap = {
                user1,
                user2,
                status,
                skill1,
                skill2
            }
            swaps.push(swap);
        }
        pendingRequests += request.pending.length;
        acceptedRequests += request.accepted.length;
        rejectedRequests += request.rejected.length;
    }
    const stats = {
        totalUsers,
        pendingRequests,
        acceptedRequests,
        rejectedRequests
    }; res.json({ isAdmin: true, users, stats, swaps })
})

router.patch('/ban/:id', isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { isBanned: true });
    res.status(200).json({ message: 'User banned successfully' });
  } catch (err) {
    console.error('Ban error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
    res.session.isAdmin = false;
})

module.exports = router;