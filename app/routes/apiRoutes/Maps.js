const express = require('express');
const router = express.Router();

const { createMap, deleteMap, editMap, getMaps,} = require('../../controllers/Maps');

router.get('/', getMaps);

router.post('/', createMap);

router.put('/:id', editMap);

router.delete('/:id', deleteMap);


module.exports = router;