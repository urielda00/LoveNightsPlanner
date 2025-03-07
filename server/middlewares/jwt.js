// generate a token to use:
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// configuration:
dotenv.config();
const secret = process.env.JWT_CODE;

// for login
export const createToken = (userId, userRole) => {
	const expiresIn = userRole == 'admin' ? '15m' : '1h';
	return jwt.sign({ userId, role: userRole }, secret, { expiresIn });
};

// for reset
export const generateResetToken = () => {
	return crypto.randomBytes(32).toString('hex'); // יוצר טוקן באורך 32 תו
};

const verifyToken = (req, res, next, role) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Token not found' });
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: 'Token is invalid or expired' });
		}

		req.user = decoded;
		if (!role.includes(decoded.role)) {
			return res.status(403).json({ message: `You do not have access` });
		}

		next();
	});
};

export const isAdmin = (req, res, next) => {
	verifyToken(req, res, next, ['admin']);
};

export const isUser = (req, res, next) => {
	verifyToken(req, res, next, ['user']);
};
export const isAdminOrUser = (req, res, next) => {
	verifyToken(req, res, next, ['admin', 'user']);
};
