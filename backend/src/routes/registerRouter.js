const express = require('express');
const User = require('../models/user');
const MileTracker = require('../models/tracker');
const fetch = require('node-fetch');

const router = express.Router();
const captcha = '6Lenhc4ZAAAAAH642J3Z_8AY4MbQyBHtvDa9pPpf'

// Create User
router.post('/user', async (req, res, next) => {
    const newUser = req.body.user;

    const exisitingUser = await User.findOne({ userId: newUser.userId });

    if (exisitingUser) {
        return res.status(400).send({ error: 'This user has been registered. Please log in with a different user ID' });
    }

    const user = new User({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userId: newUser.userId,
        phone: newUser.phone, 
        email: newUser.email,
        team: newUser.team,
        miles: 0
    });

    await user.save();

    res.status(201).send({ id: user._id });
});

// Create Mile
router.post('/mile', async (req, res, next) => {
    const newTracker = req.body.tracker;

    const existingUser = await User.findOne({ userId: newTracker.userId });

    if (!existingUser) {
        return res.status(404).send({ error: 'User does not exist' });
    }

    const tracker = new MileTracker(newTracker);

    await tracker.save();
    existingUser.miles = existingUser.miles + tracker.miles;

    await User.updateOne({ userId: existingUser.userId }, existingUser); 

    res.status(200).send({ id: tracker._id });
});

router.post('/captcha', async (req, res, next) => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' 
        },
        body: `secret=${ captcha }&response=${ req.body.humanKey }`,
        redirect: 'follow'
      };
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', requestOptions);
    const data = await response.json();
    return res.status(data.success ? 200 : 400).send({ message: data.success });
});

module.exports = router;