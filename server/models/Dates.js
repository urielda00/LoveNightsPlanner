// archive + future dates
import mongoose from 'mongoose';
const DateSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		activityId: { type: String, required: true }, // linked to attractions/nature...
		date: { type: Date, required: true },
		budget: { type: Number },
		status: { type: String, enum: ['מתוכנן', 'בוצע', 'מבוטל'], default: 'מתוכנן' },
		rating: { type: Number, min: 1, max: 5 }, // דירוג לאחר ביצוע
		notes: { type: String },
	},
	{ timestamps: true }
);

const ADate = mongoose.model('ADate', DateSchema);
export default ADate;
