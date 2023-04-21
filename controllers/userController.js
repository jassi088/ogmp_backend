const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Create a user
const registerUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        // Create a new user
        await User.create(req.body);
        res.send({
            success: true,
            message: 'Account created successfully',
        });
    } else {
        // User already exists
        throw new Error('User already exists');
    }
});


// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email });


    let validPassword;

    if (user) {
        validPassword = await bcrypt.compare(password, user?.password);
    } else {
        throw new Error("Invalid Credentials");
    }

    if (user.status !== 'active') {
        throw new Error('You maybe blocked for some strange reason');
    }

    if (user && validPassword) {
        // create and assign token
        const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token
        });
    } else {
        throw new Error("Invalid Credentials");
    }

});


// Get user Info
const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId, { password: false });
    if (user) {
        res.send({
            success: true,
            message: "User found successfully",
            data: user,
        });
    } else {
        throw new Error("User not found");
    }
});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.send({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } else {
        throw new Error("No user found");
    }
});


const updateUserStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, req.body);
    res.send({
        success: true,
        message: "User status updated successfully",
    });
});




module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUserStatus,
}