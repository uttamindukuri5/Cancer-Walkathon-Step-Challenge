const express = require('express');
const User = require('../models/user');
const MileTracker = require('../models/tracker');

const router = express.Router();

router.get('/teams', async(req, res, next) => {
    const users = await User.find({});
    console.log(users);
    
    const teamList = [];
    for (let user of users) {
        if (!teamList[user.team]) {
            const teamData = {
                teamName: user.team,
                totalMiles: user.miles
            };
            teamList.push(teamData);
        }
        else
            teamList[user.team].totalMiles += user.miles;
    }
    return res.status(200).send(teamList);
});

module.exports = router;