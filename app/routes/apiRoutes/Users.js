const express = require('express');
const router = express.Router();

const { createUser, deleteUser, editUser, getUsers,} = require('../../controllers/Users');

router.get('/', getUsers);

router.post('/', createUser);

router.put('/:id', editUser);

router.delete('/:id', deleteUser);


module.exports = router;