const asyncHandler = require('express-async-handler');
const { body, validationResult, param} = require('express-validator');

const Users = require('../models/Users');

const getUsers = asyncHandler(async (req, res, next) => {
    const allUsers = await Users.find();

    return res.send(allUsers);
})

const getRequestUser = asyncHandler(async (req, res, next) => {
    const address = req.ip;
    const user = await Users.findOne({address});

    return res.send(user);
})

const createUser = [
    // body('name').exists().isString(),
    asyncHandler(async (req, res, next) => {
        // const { name } = req.body;
        const address = req.ip
        //
        // const result = validationResult(req);
        // const errors = result.errors;
        //
        // if(errors.length){
        //     return  res.status(401).send(errors);
        // }

        const userExists = await Users.findOne({address});

        if(userExists){
            const error = new Error('User with such address already exists');
            error.code = 400;

            throw error
        }

        const newUser = await Users.create({address});

        return res.send(newUser)
}),
]

// const editUser = [
//     body('name').exists().isString(),
//     asyncHandler(async (req, res, next) => {
//         const { id } = req.params;
//         const { name } = req.body;
//
//         const result = validationResult(req);
//         const errors = result.errors;
//
//         if(errors.length){
//             return  res.status(401).send(errors);
//         }
//
//         const user = await Users.findById(id);
//
//         if(!user){
//             const error = new Error('User with such id dosn\'t exists');
//             error.code = 400;
//
//             throw error
//         }
//
//         const editedUser = await Users.findByIdAndUpdate(id, { name } );
//
//         return res.send(editedUser)
//     }),
// ]

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const userExists = await Users.findById(id);

    if(!userExists){
        const error = new Error('User with such id dosn\'t exists');
        error.code = 400;

        throw error
    }

    await Users.findByIdAndDelete(id);

    return res.send(true)
});

module.exports = {
    createUser, deleteUser, getUsers, getRequestUser
}