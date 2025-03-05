// a composed model, called trip:
import mongoose from 'mongoose';
const TripSchema = new mongoose.Schema(
	{
		coupleId: { type: String, required: true },
		title: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		totalBudget: { type: Number },
		itinerary: [
			{
				day: Number, // day number in the trip
				activities: [{ activityId: String }],
			},
		],
		notes: { type: String },
	},
	{ timestamps: true }
);
const Trip = mongoose.model('Trip', TripSchema);
export default Trip;
