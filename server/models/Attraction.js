// places ( attractions )
import mongoose from 'mongoose';

const AttractionSchema = new mongoose.Schema(
	{
		status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
		uniqueCode: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String },
		category: { type: String, enum: ['טבע', 'מסעדה', 'אטרקציה', 'תרבות', 'אחר'], required: true },
		location: { type: String, required: true },
		avgRating: { type: Number, default: 0, min: 0, max: 5 },
		avgRatingCount: { type: Number, default: 0 },
		priceRange: { type: String, enum: ['חינם', 'זול', 'בינוני', 'יקר'] },
		website: { type: String },
		images: [{ type: String }],
	},
	{ timestamps: true }
);

const Attraction = mongoose.model('Attraction', AttractionSchema);
export default Attraction;
