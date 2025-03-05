// reviews about the place, including stars of an average experience
import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema(
	{
		coupleId: { type: String, required: true },
		activityId: { type: String, required: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		comment: { type: String },
	},
	{ timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
