const express = require('express');
const router = express.Router();

const { createCharacter, deleteCharacter, editCharacter, getCharacters, checkCharacterExistenceOnPosition} = require('../../controllers/Characters');
const protectRoute = require("../../middleware/simpleProtect");

router.get('/', getCharacters);

router.post('/', protectRoute, createCharacter);

router.post('/exists-on/:id', checkCharacterExistenceOnPosition);

router.put('/:id', protectRoute, editCharacter);

router.delete('/:id', protectRoute, deleteCharacter);


module.exports = router;