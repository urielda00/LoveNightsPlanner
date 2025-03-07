import express from 'express';
import * as actions from '../controllers/attractions.js';
import preAuthUpload from '../middlewares/preAuthUpload.js';
import { isAdminOrUser, isAdmin } from '../middlewares/jwt.js';

const attractionsRouter = express.Router();

attractionsRouter.post('/createAttraction', isAdminOrUser, preAuthUpload.any(), actions.createAttraction);

attractionsRouter.post('/updateAttraction', isAdminOrUser, actions.updateAttraction);
// upload.any()
attractionsRouter.post('/deleteAttraction', isAdmin, actions.deleteAttraction);
export default attractionsRouter;
// upload.any()
