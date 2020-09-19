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

module.exports = router;