const express = require('express');
const { registerUser, loginUser, getUser, getAllUsers, updateUserStatus } = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddlware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-current-user', auth, getUser);

// Admin Route
router.get('/get-all-users', auth, getAllUsers);
router.put('/update-user-status/:id', auth, updateUserStatus);

module.exports = router;