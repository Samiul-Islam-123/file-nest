const { Signup, Login, ResetPassword, VerifyOTP , PerformPasswordReset, VerifyPasswordOTP} = require('../controllers/AuthController');

const AuthRouter = require('express').Router();

AuthRouter.post('/signup', Signup);
AuthRouter.post('/login', Login);
AuthRouter.post('/request-password-reset', ResetPassword);
AuthRouter.post('/perform-password-reset', PerformPasswordReset);
AuthRouter.post('/verify-password-otp', VerifyPasswordOTP);
AuthRouter.post('/verify-otp', VerifyOTP);

module.exports = AuthRouter;