const express = require('express');
const router = express.Router();

const { createUser, deleteUser, getUsers, getRequestUser} = require('../../controllers/Users');
const protectRoute = require("../../middleware/simpleProtect");

router.get('/', getUsers);

router.get('/by-ip', getRequestUser);

router.post('/', createUser);

// router.put('/:id', editUser);

router.delete('/:id', protectRoute, deleteUser);


module.exports = router;