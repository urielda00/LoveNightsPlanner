// locations to go (mostly nature)
import mongoose from 'mongoose';

const NatureLocationSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		address: { type: String },
		//location: { street: String, number: Number },//add location by google maps API?
		region: { type: String },
	},
	{ timestamps: true }
);

const NatureLocation = mongoose.model('NatureLocation', NatureLocationSchema);
export default NatureLocation;
