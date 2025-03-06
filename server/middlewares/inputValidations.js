import { check, validationResult } from 'express-validator';

export const ValidationResult = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		//if there is some error. so:
		const resultArr = [];
		const error = result.array();

		for (let i = 0; i < error.length; i++) {
			resultArr.push(error[i].msg);
		}
		return res.status(422).json({ success: false, error: resultArr }).send();
	}
	next();
};

// REGISTER
export const registerValidation = [
	check('coupleNickName')
		.trim()
		.notEmpty()
		.withMessage('Please enter coupleNickName')
		.isLength({ min: 2, max: 15 })
		.withMessage('coupleNickName muse be between 2 to 15 characters'),

	check('emailOne').trim().notEmpty().withMessage('Please enter email').isEmail().withMessage('Email is not valid.'),

	check('verifiedPass').trim().notEmpty().withMessage('Please repeat password').isLength({ min: 5 }).withMessage('Password must be more than 5 letters.'),

	check('password').trim().notEmpty().withMessage('Please enter password').isLength({ min: 5 }).withMessage('Password must be more than 5 letters.'),
];

// LOGIN
export const loginValidation = [
	check('coupleNickName').trim().notEmpty().withMessage('Please enter coupleNickName'),
	check('password').trim().notEmpty().withMessage('Please enter password'),
];
// UPDATE PASS
export const changePass = [
	check('coupleNickName').trim().notEmpty().withMessage('Please enter coupleNickName'),

	check('password').trim().notEmpty().withMessage('Please enter your existing password'),

	check('newPassword').trim().notEmpty().withMessage('Please enter the new password').isLength({ min: 5 }).withMessage('Password must be more than 5 letters.'),

	check('verifyNewPassword')
		.trim()
		.notEmpty()
		.withMessage('Please repeat the new password')
		.isLength({ min: 5 })
		.withMessage('Password must be more than 5 letters.'),
];
// DELETE USER
export const deleteUserValidation = [
	check('coupleNickName').trim().notEmpty().withMessage('Please enter coupleNickName'),

	check('password').trim().notEmpty().withMessage('Please enter your existing password'),
];

// // CREATE PRODUCT
// export const createProductValidation = [
// 	check('shortDescription')
// 		.trim()
// 		.notEmpty()
// 		.withMessage('please enter short description')
// 		.isLength({ min: 4, max: 50 })
// 		.withMessage('Please enter short description between 4 to 50 characters'),

// 	check('longDescription')
// 		.trim()
// 		.notEmpty()
// 		.withMessage('please enter long description')
// 		.isLength({ min: 4, max: 150 })
// 		.withMessage('Please enter long description between 4 to 150 characters'),

// 	check('price')
// 		.trim()
// 		.isNumeric()
// 		.withMessage('must be a number')
// 		.notEmpty()
// 		.withMessage('please enter price')
// 		.isLength({ min: 1, max: 5 })
// 		.withMessage('Please enter price between 1 to 5 characters'),

// 	check('category').trim().notEmpty().withMessage('Please enter category'),

// 	check('quantity').trim().isNumeric().withMessage('must be a number').notEmpty().withMessage('please enter quantity'),

// 	check('productName')
// 		.trim()
// 		.notEmpty()
// 		.withMessage('Please enter the product name')
// 		.isLength({ min: 2, max: 20 })
// 		.withMessage('Please enter name between 2 to 20 characters'),
// 	// Multer middleware take care of the image validation- size, ext, mimetype, and more.
// ];

// // CREATE ORDER:
// export const createOrderValidation = [
// 	check('address').trim().notEmpty().withMessage('Please enter your address'),
// 	check('productsId').notEmpty().withMessage('The shopping cart is empty'),
// ];
