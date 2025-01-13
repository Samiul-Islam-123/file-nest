const { Signup, Login, ResetPassword } = require('../controllers/AuthController');

const AuthRouter = require('express').Router();

AuthRouter.post('/signup', Signup);
AuthRouter.post('/login', Login);
AuthRouter.post('/reset-password', ResetPassword);

module.exports = AuthRouter;