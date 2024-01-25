const asyncHandler = require('express-async-handler');
const { body, validationResult, param} = require('express-validator');

const Score = require('../models/Score');
const Maps = require("../models/Maps");
const Users = require("../models/Users");

const verifyMapExists = async value => {
    const mapExists = await Maps.findById(value);
    if(!mapExists){
        throw Error('Map with such id dosn\'t exists')
    }
}

const verifyUserExists = async value => {
    const userExists = await Users.findById(value);
    if(!userExists){
        throw Error('User with such id dosn\'t exists')
    }
}

const getLeaderboard = asyncHandler(async (req, res, next) => {
    const { map_id } = req.params;
    const leaderboard = await Score.find({map_id});
    return res.send(leaderboard);
})

const assignScore = [
    body('map_id').optional().isMongoId().custom(verifyMapExists),
    body('user_id').optional().isMongoId().custom(verifyUserExists),
    body('score').exists().isNumeric(),
    asyncHandler(async (req, res, next) => {
        const { map_id, user_id, score, } = req.body;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return  res.status(401).send(errors);
        }

        const scoreInDB = await Score.findOne({map_id, user_id});

        if(!scoreInDB){
            const newScore = await Score.create({map_id, user_id, score});

            return res.send(newScore)
        }

        if(scoreInDB.score > score){
            const error = new Error('You trying to rewrite better result which is restricted');
            error.code = 400;

            throw error
        } else {
            const updatedScore = await Score.findByIdAndUpdate(scoreInDB._id, {score});
            updatedScore.score = score;
            return res.send(updatedScore)
        }
}),
]

const deleteScore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const scoreExists = await Score.findById(id);

    if(!scoreExists){
        const error = new Error('Score with such id dosn\'t exists');
        error.code = 400;

        throw error
    }

    await Score.findByIdAndDelete(id);

    return res.send(true)
});

module.exports = {
    assignScore, deleteScore, getLeaderboard,
}