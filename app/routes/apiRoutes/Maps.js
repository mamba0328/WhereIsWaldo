const express = require('express');
const router = express.Router();

const { createMap, deleteMap, editMap, getMaps,} = require('../../controllers/Maps');
const protectRoute  = require("../../middleware/simpleProtect");

router.get('/', getMaps);

router.post('/', protectRoute, createMap);

router.put('/:id', protectRoute, editMap);

router.delete('/:id', protectRoute, deleteMap);


module.exports = router;