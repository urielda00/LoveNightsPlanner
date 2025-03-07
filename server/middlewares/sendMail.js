import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// configuration:
dotenv.config();
const myMail = process.env.MAIL;
const mPass = process.env.M_Pass;
const appPass = process.env.GMAIL_APP_PASS;
const domain = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: myMail,
		pass: appPass,
	},
});

export const sendResetEmail = (userEmail, resetToken) => {
	const resetUrl = `${domain}/auth/reset-password/${resetToken}`;
	const mailOptions = {
		from: myMail,
		to: userEmail,
		subject: 'איפוס סיסמה',
		text: `שלום, קיבלת בקשה לאיפוס סיסמה. אם אתה לא עשית זאת, אנא התעלם מהודעה זו. 
           אם ברצונך לאפס את הסיסמה שלך, לחץ על הלינק הבא: ${resetUrl}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error sending email:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});
};
