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
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            })
        }
        res.json('Created the thought 🎉');
    } catch (err) {
        res.status(500).send(err);
    }
});

//PUT update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!result) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        //since reactionSchema is not a model and sits in thoughts we do not need to create a reaction and then add it to Thought. We can just find a thought and then update it with the information of our reaction. When then runValidator: true so it will check that req.body contains the required things as defined by the schema.
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { new: true, runValidators: true }
        );
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE remove a reaction by its reactionId
router.delete('/:thoughtId/reactions/:reactionId', async(req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;