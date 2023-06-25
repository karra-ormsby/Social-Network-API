const Thought = require('../../models/Thought');
const User = require('../../models/User');

const router = require('express').Router();

// '/api/thoughts'

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const result = await Thought.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET a single thought by it's _id
router.get('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOne({ _id: req.params.thoughtId })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST a new thought (push to associated user's thoughts array)
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thought: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Application created, but found no user with that ID',
            })
        }
        res.json('Created the thought 🎉');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;