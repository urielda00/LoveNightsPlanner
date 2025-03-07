// account info
import mongoose from 'mongoose';

const CoupleSchema = new mongoose.Schema(
	{
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
		coupleNickName: { type: String, required: true, unique: true },
		emailOne: { type: String, required: true, unique: true },
		password: { type: String, required: true, min: 5 },
		dates: [
			{
				dateId: { type: String },
			},
		],
		accountStatus: { type: String, enum: ['available', 'unavailable'], default: 'available' },
	},
	{ timestamps: true }
);

const CoupleUser = mongoose.model('CoupleUser', CoupleSchema);
export default CoupleUser;
