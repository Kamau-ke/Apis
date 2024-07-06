const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token=jwt.sign({userId:user._id, name:user.name}, 'jwtSecret', {expiresIn:'30d'})
        
        res.status(StatusCodes.CREATED).json({ user:{name: user.name}, token });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const login = async (req, res) => {
    res.status(StatusCodes.OK).send('login user');
};

module.exports = {
    register,
    login
};
