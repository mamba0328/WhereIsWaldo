const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");

const { connectToMongoDB } = require('./db/connectMongoDB');

const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(connectToMongoDB)

app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.code ?? 500).send(err.message);
});

module.exports = app;
