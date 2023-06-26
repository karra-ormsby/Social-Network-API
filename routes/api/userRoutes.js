const Thought = require('../../models/Thought');
const User = require('../../models/User');

const router = require('express').Router();

// '/api/users'

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await User.find({})
        .select('-__v')
        .populate('thoughts')
            .populate('friends');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET a single user by its _id (populated friend and thought data)
router.get('/:userId', async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const result = await User.create(
            {
             username: req.body.username,
                email: req.body.email   
            }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT update a user by its _id
router.put('/:userId', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {username: req.body.username},
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE a user by its _id (and their associated thoughts)
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } })
        res.status(200).json({message: 'User and thoguths deleted!'});
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST add new friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const friend = await User.findOne({_id: req.params.friendId});
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: friend._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'Friend added, but found no user with that ID',
            })
        }
        res.json('Added friend 🎉');
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;