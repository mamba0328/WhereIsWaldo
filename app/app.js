const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const { connectToMongoDB } = require('./db/connectMongoDB');
const apiRouter = require('./routes/api');


const app = express();
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 200,
});


app.use(limiter);

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    }),
);

app.set('trust proxy', true);

app.use(compression());

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(connectToMongoDB)

app.use('/api', apiRouter);

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../public/index.html")
    );
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.code ?? 500).send(err.message);
});

module.exports = app;
