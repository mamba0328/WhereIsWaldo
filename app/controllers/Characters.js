const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const TimeService = require('../services/TimeService');

const Characters = require('../models/Characters');
const Maps = require('../models/Maps');

const timer = new TimeService();
const validatePosition = async value =>{
    const keys = Object.keys(value);
    const values = Object.values(value);

    if(keys.length < 2 || !keys.includes('top_left') || !keys.includes('bottom_right')){
        throw Error('Position should contain top_left and bottom_right coordinated');
    }
    values.forEach((value, index) => {
        if(!('x' in value) || !('y' in value)){
            throw Error(`x and y coordinates should be inside ${keys[index]}`);
        }
    })
}

const getCharacters = asyncHandler(async (req, res, next) => {
    const { map_id } = req.query;
    const allCharacters = await Characters.find({...map_id && { map_id }}).select('-position');
    timer.startTimer();
    return res.send(allCharacters);
})

const createCharacter = [
    body('name').exists().isString(),
    body('map_id').exists().isMongoId(),
    body('hint').optional().isString(),
    body('position').exists().custom(validatePosition),
    asyncHandler(async (req, res, next) => {
        const { name, map_id, hint, position } = req.body;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return  res.status(401).send(errors);
        }

        const characterExists = await Characters.find({name, map_id});

        if(characterExists.length){
            const error = new Error('Character with such name already exists on the map');
            error.code = 400;

            throw error
        }

        const newCharacter = await Characters.create({name, map_id, hint, position});

        return res.send(newCharacter);
}),
]

const editCharacter = [
    body('name').optional().isString(),
    body('map_id').optional().isMongoId(),
    body('hint').optional().isString(),
    body('position').exists().custom(validatePosition),
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { name, map_id, hint, position } = req.body;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return  res.status(401).send(errors);
        }

        const characterExists = await Characters.findById(id);

        if(!characterExists){
            const error = new Error('Character with such id dosn\'t exist');
            error.code = 400;

            throw error
        }

        const newCharacter = await Characters.findByIdAndUpdate(id, {
            ...name && {name},
            ...map_id && {map_id},
            ...hint && {hint},
            ...position && {position}}
        );

        return res.send(newCharacter);
    }),
]

const deleteCharacter = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const characterExists = await Characters.findById(id);

    if(!characterExists){
        const error = new Error('Character with such id dosn\'t exists');
        error.code = 400;

        throw error
    }

    await Characters.findByIdAndDelete(id);

    return res.send(true)
});

const checkCharacterExistenceOnPosition =  [
    body('map_id').optional().isMongoId().custom(async value => {
        const mapExists = await Maps.findById(value);
        if(!mapExists){
            throw Error('Map with such id dosn\'t exists')
        }
    }),
    body('point').custom(async value => {
        if(!('x' in value) || !('y' in value)){
            throw Error(`x and y coordinates are required`);
        }
    }),
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { map_id, point } = req.body;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return  res.status(401).send(errors);
        }

        const character = await Characters.findOne({_id: id, map_id});

        if(!character){
            const error = new Error('Character with such id dosn\'t exist on this map');
            error.code = 400;

            throw error
        }

        const { top_left, bottom_right } = character.position;

        const xIsInsideCharacterBox = point.x >= top_left.x && point.x <= bottom_right.x;
        const yIsInsideCharacterBox = point.y >= top_left.y && point.y <= bottom_right.y;
        const pointInSideCharacterBox = xIsInsideCharacterBox && yIsInsideCharacterBox;

        res.send({exists:pointInSideCharacterBox, time_taken:timer.getTimePassed()});
    })
]

module.exports = {
    createCharacter, deleteCharacter, editCharacter, getCharacters, checkCharacterExistenceOnPosition
}