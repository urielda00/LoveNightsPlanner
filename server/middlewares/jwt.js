// generate a token to use:
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

// configuration:
dotenv.config();
const secret = process.env.JWT_CODE;

// for login
export const createToken = (userId, userRole) => {
	return jwt.sign({ userId,role: userRole  }, secret, { expiresIn: '1h' });
};


// for reset
export const generateResetToken = ()=> {
  return crypto.randomBytes(32).toString('hex'); // יוצר טוקן באורך 32 תו
}
