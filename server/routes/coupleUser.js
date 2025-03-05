import express from 'express'
import * as action from '../controllers/coupleUser.js' ;
const coupleUserRouter = express.Router();

coupleUserRouter.post('/register',action.register);
coupleUserRouter.post('/login',action.login);
coupleUserRouter.post('/changePass',action.changePass);
coupleUserRouter.post('/resetPass',action.resetPass);
coupleUserRouter.post('/reset-password/:token',action.resetOnProgress);
coupleUserRouter.post('/actualReset',action.actualResetPass);
coupleUserRouter.post('/delete',action.deleteAccount);






export default coupleUserRouter;
