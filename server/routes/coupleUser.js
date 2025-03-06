import express from 'express';
import * as action from '../controllers/coupleUser.js';
import * as validation from '../middlewares/inputValidations.js';

const coupleUserRouter = express.Router();

coupleUserRouter.post('/register', validation.registerValidation, validation.ValidationResult, action.register);

coupleUserRouter.post('/login', validation.loginValidation, validation.ValidationResult, action.login);

coupleUserRouter.post('/changePass', action.changePass);
coupleUserRouter.post('/resetPass', action.resetPass);
coupleUserRouter.post('/reset-password/:token', action.resetOnProgress);

coupleUserRouter.post('/actualReset', validation.changePass, validation.ValidationResult, action.actualResetPass);

coupleUserRouter.post('/delete', validation.deleteUserValidation, validation.ValidationResult, action.deleteAccount);

export default coupleUserRouter;
