const express = require('express');
const router = express.Router();

const { assignScore, deleteScore, getLeaderboard, getSingleScore} = require('../../controllers/Score');
const  protectRoute  = require("../../middleware/simpleProtect");

router.get('/', getSingleScore);

router.get('/:map_id', getLeaderboard);

router.post('/', assignScore);

router.delete('/:id', protectRoute, deleteScore);


module.exports = router;