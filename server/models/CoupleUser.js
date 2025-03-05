// account info
import mongoose from 'mongoose';

const CoupleSchema = new mongoose.Schema(
	{
		coupleNickName: { type: String, required: true, unique: true },
		emailOne: { type: String, required: true, unique: true },
		emailTwo: { type: String, unique: true }, //optional
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
