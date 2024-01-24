const express = require('express');
const router = express.Router();

const mapsRouter = require('./apiRoutes/Maps');

router.use('/maps', mapsRouter);

module.exports = router;