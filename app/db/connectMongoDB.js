const mongoose = require('mongoose');
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI;
async function connectToMongoDB(req, res, next) {
    try {
        console.log(MONGO_URI)
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function disconnectFromMongoDB(req, res, next) {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        next();
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
}
module.exports = {disconnectFromMongoDB, connectToMongoDB};
