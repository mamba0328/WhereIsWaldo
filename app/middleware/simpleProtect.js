require('dotenv').config();
const protectRoute = (req, res, next) => { //this works only because app is fairly simple and doesn't require any user data;
    const { api_password } = req.query;
    if(api_password !== process.env.API_PASSWORD){
        const error = new Error('Wrong password');
        error.code = 400;
        throw error;
    }

    next();
}

module.exports = protectRoute;