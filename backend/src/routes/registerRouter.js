const express = require('express');
const User = require('../models/user');
const MileTracker = require('../models/tracker');

const router = express.Router();

// Create User
router.post('/user', async (req, res, next) => {
    const newUser = req.body.user;

    const exisitingUser = await User.findOne({ phone: newUser.phone });

    if (exisitingUser) {
        return res.status(400).send({ message: 'This user has been registered. Please log in with a different phone number' });
    }

    const user = new User({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone, 
        email: newUser.email,
        team: newUser.team,
        miles: 0
    });

    await user.save();

    res.status(201).send({ id: user._id });
})

// Create Mile
router.post('/mile', async (req, res, next) => {
    const newTracker = req.body.tracker;

    const existingUser = await User.findOne({ phone: newTracker.phone });

    if (!existingUser) {
        return res.status(400).send('User does not exist');
    }

    const tracker = new MileTracker(newTracker);

    await tracker.save();
    existingUser.miles = existingUser.miles + tracker.miles;

    await User.updateOne({ phone: existingUser.phone }, existingUser); 

    res.status(200).send({ id: tracker._id });
});

module.exports = router;