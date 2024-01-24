const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Maps = require('../models/Maps');

const getMaps = asyncHandler(async (req, res, next) => {
    const allMaps = await Maps.find();
    return res.send(allMaps);
})

const createMap = [
    body('name').exists().isString(),
    body('path').exists().isString(),
    asyncHandler(async (req, res, next) => {
        const { name, path } = req.body;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return  res.status(401).send(errors);
        }

        const mapExists = await Maps.find({$or:[{name},{path}]});

        if(mapExists.length){
            const error = new Error('Map with such name or path already exists');
            error.code = 400;

            throw error
        }

        const newMap = await Maps.create({name, path});

        return res.send(newMap)
}),
]

const editMap = [
    body('name').optional().isString(),
    body('path').optional().isString(),
    asyncHandler(async (req, res, next) => {
        const { name, path } = req.body;
        const { id } = req.params;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return res.status(401).send(errors);
        }

        if(!name && !path){
            const error = {msg: 'You need to specifies at least one field'}
            return res.status(401).send(error);
        }

        const mapExists = await Maps.findById(id);

        if(!mapExists){
            const error = new Error('Map with such id dosn\'t exists');
            error.code = 400;

            throw error
        }

        const editedMap = await Maps.findByIdAndUpdate(id, { ...name && {name}, ...path && {path}});

        return res.send(editedMap)
    }),
]

const deleteMap = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const mapExists = await Maps.findById(id);

    if(!mapExists){
        const error = new Error('Map with such id dosn\'t exists');
        error.code = 400;

        throw error
    }

    await Maps.findByIdAndDelete(id);

    return res.send(true)
});

module.exports = {
    createMap, deleteMap, editMap, getMaps,
}