const express = require('express');
const router = express.Router();

const { createCharacter, deleteCharacter, editCharacter, getCharacters, checkCharacterExistenceOnPosition} = require('../../controllers/Characters');

router.get('/', getCharacters);

router.post('/', createCharacter);

router.post('/exists-on/:id', checkCharacterExistenceOnPosition);

router.put('/:id', editCharacter);

router.delete('/:id', deleteCharacter);


module.exports = router;