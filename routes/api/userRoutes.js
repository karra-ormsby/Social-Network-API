const User = require('../../models/User');

const router = require('express').Router();

// '/api/users'

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await User.find({});
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
            .populate('thought');
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

module.exports = router;