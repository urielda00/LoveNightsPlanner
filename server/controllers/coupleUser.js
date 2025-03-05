import bcrypt from 'bcryptjs';
import Tokens from '../models/Tokens.js';
import CoupleUser from '../models/CoupleUser.js';
import { sendResetEmail } from '../middlewares/sendMail.js';
import { createToken, generateResetToken } from '../middlewares/jwt.js';
import { coupleUserErrorLogger, coupleUserInfoLogger } from '../middlewares/logger.js';

// todo : add a validations to all fields

// register a new user:
export const register = async (req, res) => {
	try {
		// declarations for first validations:
		const { coupleNickName, emailOne, emailTwo, password, verifiedPass } = req.body;
		const emailsChecker = emailOne;
		const isCoupleExisted = await CoupleUser.findOne({ coupleNickName });
		const isMailExisted = await CoupleUser.findOne({ emailsChecker });

		if (password == verifiedPass) {
			if (!isCoupleExisted && !isMailExisted) {
				const hashedPassword = await encryptPass(password);

				const saveUser = new CoupleUser({
					emailOne,
					emailTwo,
					coupleNickName,
					password: hashedPassword,
				});

				await saveUser.save();
				coupleUserInfoLogger.log('info', 'User created! status code: 201');
				res.status(codes.created).json({ message: 'User created successfully!!' }).send();
			} else {
				coupleUserErrorLogger.log('error', ` User already exist! status code: 409`);
				res.status(codes.probInValid).json({ message: 'User already exist!' });
			}
		} else {
			coupleUserErrorLogger.log('error', ` The passwords must match!! status code: 409`);
			res.status(codes.probInValid).json({ message: 'The passwords must match!!' });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// login into account:
export const login = async (req, res) => {
	try {
		// declarations for first validations:
		const { coupleNickName, password } = req.body;
		const user = await CoupleUser.findOne({ coupleNickName });
		const isMatchPass = bcrypt.compareSync(password, user.password);

		if (isMatchPass && user && user.accountStatus == 'available') {
			const token = createToken(user._id);

			//send token to the client side
			res.cookie('token', token, { ...cookieData, axAge: 60 * 60 * 1000 });
			coupleUserInfoLogger.log('info', 'Token set in cookie status code: 200');
			res.status(codes.success).json({ success: true, message: 'Token set in cookie' });
		} else {
			coupleUserErrorLogger.log('error', ` Wrong UserName Or Pass! status code: 409`);
			res.status(codes.probInValid).json({ message: 'Wrong UserName Or Pass!' });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// change password: (when currently logged in)
export const changePass = async (req, res) => {
	try {
		const { coupleNickName, password, newPassword, verifyNewPassword } = req.body;
		const user = await CoupleUser.findOne({ coupleNickName });
		const isMatchPass = bcrypt.compareSync(password, user.password);

		if (isMatchPass) {
			if (newPassword == verifyNewPassword) {
				const hashedNewPassword = await encryptPass(newPassword);

				await CoupleUser.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });
				coupleUserInfoLogger.log('info', 'User password updated successfully!. status code: 200');
				res.status(codes.success).send('User password updated successfully!');
			} else {
				coupleUserErrorLogger.log('error', ` The passwords do not match. status code: 409`);
				res.status(codes.probInValid).json({ message: 'The passwords do not match' });
			}
		} else {
			coupleUserErrorLogger.log('error', ` Wrong Pass!. status code: 409`);
			res.status(codes.probInValid).json({ message: 'Wrong Pass!' });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// forgotten pass:
export const resetPass = async (req, res) => {
	try {
		const { email } = req.body;
		const checkEmail = await CoupleUser.findOne({ emailOne: email });
		const checkSecondEmail = await CoupleUser.findOne({ emailTwo: email });

		if (checkEmail || checkSecondEmail) {
			const randomToken = generateResetToken();

			const saveToken = new Tokens({
				token: randomToken,
			});
			await saveToken.save();
			sendResetEmail(email, randomToken);
			coupleUserInfoLogger.log('info', 'reset mail sent. status code: 200');
			res.status(codes.success).json({ message: 'reset mail sent, please check your inbox' });
		} else {
			coupleUserErrorLogger.log('error', ` Wrong Mail!. status code: 409`);
			res.status(codes.probInValid).json({ message: 'Wrong Mail!' });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// last validation
export const resetOnProgress = async (req, res) => {
	try {
		const token = req.params.token;
		const isValidToken = await Tokens.findOne({ token });

		if (isValidToken) {
			// delete the token from the db
			await Tokens.findOneAndDelete({ token });

			const newToken = createToken('someString');

			res.cookie('resetToken', newToken, { ...cookieData, axAge: 3 * 60 * 1000 });
			//  לעשות redirect בפרונט להעביר לדף איפוס סיסמה כמו שצריך:
			coupleUserInfoLogger.log('info', 'reset token set in cookie. status code: 200');
			res.status(codes.success).json({ success: true, message: 'reset token set in cookie' });
		} else {
			coupleUserErrorLogger.log('error', ` Invalid token. status code: 409`);
			res.status(codes.probInValid).json({ message: 'Invalid token' });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// actual reset pass:
export const actualResetPass = async (req, res) => {
	try {
		// in the front- check the cookie for the resetToken.
		const { newPass, coupleNickName } = req.body;
		const user = await CoupleUser.findOne({ coupleNickName });
		if (user) {
			const hashedPassword = await encryptPass(newPass);

			await CoupleUser.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

			res.clearCookie('resetToken', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			});
			coupleUserInfoLogger.log('info', 'password changed. status code: 200');
			res.status(codes.success).json({ success: true, message: 'password changed' });
		} else {
			coupleUserErrorLogger.log('error', ` Error, please try again. status code: 409`);
			res.status(codes.probInValid).json({ message: messages.error });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// delete account (just move its status to unavailable)
export const deleteAccount = async (req, res) => {
	try {
		const { coupleNickName, password } = req.body;
		const user = await CoupleUser.findOne({ coupleNickName });
		if (user) {
			const validate = bcrypt.compareSync(password, user.password);
			if (validate) {
				await CoupleUser.updateOne({ _id: user._id }, { $set: { accountStatus: 'unavailable' } });
				coupleUserInfoLogger.log('info', 'user deleted. status code: 200');
				res.status(codes.success).json({ success: true, message: 'user deleted' });
			} else {
				coupleUserErrorLogger.log('error', ` Error, please try again. status code: 409`);
				res.status(codes.probInValid).json({ message: messages.error });
			}
		} else {
			coupleUserErrorLogger.log('error', ` Error, please try again. status code: 409`);
			res.status(codes.probInValid).json({ message: messages.error });
		}
	} catch (error) {
		coupleUserErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(codes.err).json(error.message);
	}
};

// helper functions/ data:
const encryptPass = async (password) => {
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

const cookieData = {
	httpOnly: true, // mange the access to the cookie only in server side
	secure: process.env.NODE_ENV === 'production', // for production env
};

const codes = {
	success: 200,
	created: 201,
	probInValid: 409,
	err: 500,
};

const messages = {
	error: 'Error, please try again',
};
