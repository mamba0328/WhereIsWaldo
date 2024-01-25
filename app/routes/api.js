const express = require('express');
const router = express.Router();

const mapsRouter = require('./apiRoutes/Maps');
const charactersRouter = require('./apiRoutes/Characters');
const usersRouter = require('./apiRoutes/Users');
const scoresRouter = require('./apiRoutes/Score');

router.use('/maps', mapsRouter);

router.use('/characters', charactersRouter);

router.use('/users', usersRouter);

router.use('/scores', scoresRouter)

module.exports = router;