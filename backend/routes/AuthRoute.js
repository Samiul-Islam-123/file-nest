const { Signup, Login, ResetPassword, VerifyOTP } = require('../controllers/AuthController');

const AuthRouter = require('express').Router();

AuthRouter.post('/signup', Signup);
AuthRouter.post('/login', Login);
AuthRouter.post('/reset-password', ResetPassword);
AuthRouter.post('/verify-otp', VerifyOTP);

module.exports = AuthRouter;