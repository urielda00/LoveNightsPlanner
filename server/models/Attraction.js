// places ( attractions )
import mongoose from 'mongoose';

const AttractionSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		category: { type: String, enum: ['טבע', 'מסעדה', 'אטרקציה', 'תרבות', 'אחר'], required: true },
		location: { type: String, required: true },
		avgRating: { type: Number, default: 0, min: 0, max: 5 },
		// priceRange: { type: String, enum: ['חינם', 'זול', 'בינוני', 'יקר'] },
		// website: { type: String },
	},
	{ timestamps: true }
);

const Attraction = mongoose.model('Attraction', AttractionSchema);
export default Attraction;
