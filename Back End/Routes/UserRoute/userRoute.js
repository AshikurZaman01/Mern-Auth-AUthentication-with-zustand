const express = require('express');
const userRegister = require('../../Controllers/UserController/userRegister');
const userLogin = require('../../Controllers/UserController/userLogin');
const userLogout = require('../../Controllers/UserController/userLogout');
const verifyUserEmail = require('../../Controllers/UserController/verifyUserEmail');
const userForgetPassword = require('../../Controllers/UserController/userForgetPassword');
const userResetPassword = require('../../Controllers/UserController/userResetPassword');
const { verifyToken } = require('../../Middlewear/UserMiddlewear/verifyToken');
const chechAuth = require('../../Controllers/UserController/chechAuth');
const router = express.Router();

//middlewares
router.get('/check-auth', verifyToken, chechAuth);
//middlewares

router.post('/register', userRegister);

router.post('/verifyUserEmail', verifyUserEmail);

router.post('/forgetPassword', userForgetPassword);
router.post('/resetPassword/:token', userResetPassword);

router.post('/login', userLogin);

router.get('/logout', userLogout);


module.exports = router;