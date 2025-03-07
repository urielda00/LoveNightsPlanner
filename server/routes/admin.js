import express from 'express';
import { isAdmin } from '../middlewares/jwt.js';
const adminRouter = express.Router();

attractionsRouter.get('/admin', isAdmin, (req, res) => {
	res.json({ message: 'Welcome Admin' });
});
export default adminRouter;

// need to make sure this path is necessary