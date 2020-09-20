const express = require('express');
const User = require('../models/user');
const MileTracker = require('../models/tracker');

const router = express.Router();

router.get('/teams', async(req, res, next) => {
    const users = await User.find({});
    
    const teamList = [];
    for (let user of users) {
        const existingTeam = teamList.findIndex(team => team.teamName === user.team);
        if (existingTeam === -1) {
            const teamData = {
                teamName: user.team,
                totalMiles: user.miles
            };
            teamList.push(teamData);
        }
        else
            teamList[existingTeam].totalMiles += user.miles;
    }
    return res.status(200).send(teamList);
});

router.get('/totalUsers', async(req, res, next) => {
    const users = await User.find({});

    return res.status(200).send({ totalUsers: users.length });
});

router.post('/user', async(req, res, next) => {
    const userId = req.body.userId;

    const userMiles = await MileTracker.find({ userId: userId });

    if (!userMiles || userMiles.length === 0) {
        return res.status(404).send({ error: 'User does not exist or no miles entered, either register or start entering miles' });
    }

    const response = [];
    userMiles.forEach(user => {
        const data = {
            miles: user.miles,
            date: user.date
        };
        response.push(data);
    });

    return res.status(201).send(response);
});

router.get('/listUsers', async(req, res, next) => {
    const users = await User.find({});

    const response = [];

    users.forEach(user => {
        response.push({
            userId: user.userId,
            name: `${ user.firstName } ${ user.lastName }`,
            team: user.team,
            miles: user.miles
        });
    });

    res.status(200).send(response);
});

module.exports = router;