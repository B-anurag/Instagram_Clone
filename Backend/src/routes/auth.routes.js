const express = require('express');
const authController = require('../controllers/auth.controller');
const identifyUser = require('../middlewares/auth.middleware')

const authRouter = express.Router();


//post - /api/auth/register
authRouter.post('/register', authController.registerController);
//post - /api/auth/login
authRouter.post('/login', authController.loginController);


/**
 * @route Get /api/auth/get-me
 * @desc Get the currently logged in user
 * @access Private
 */
authRouter.get('/get-me',identifyUser ,authController.getMeController);
 
module.exports = authRouter;