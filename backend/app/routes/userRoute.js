const express = require('express');
const { registerUser, loginUser, generateAccessToken } = require('../controllers/userController');
const { requestOTP, verifyOTP } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', loginUser);
router.get('/request-otp', requestOTP);
router.post('/validate-otp', verifyOTP);
router.get('/generate-token', generateAccessToken);

module.exports = router;
