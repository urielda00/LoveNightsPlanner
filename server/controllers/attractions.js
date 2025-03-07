import Attraction from '../models/Attraction.js';
import saveImagesNew from '../middlewares/uploads.js';
import { attractionsErrorLogger, attractionsInfoLogger } from '../middlewares/logger.js';

// create Attraction:
export const createAttraction = async (req, res) => {
	try {
		const { name, description, category, location, avgRating, priceRange, website, uniqueCode } = req.body;

		const found = await Attraction.findOne({ uniqueCode });
		if (!found) {
			// if not found, there is no duplications so create new one:
			const uploadedRes = await saveImagesNew(req);
			if (uploadedRes.files) {
				// if there are files, save their locations in the DB:
				const saveAttractions = new Attraction({
					name,
					images: uploadedRes.files,
					website,
					category,
					location,
					avgRating,
					uniqueCode,
					priceRange,
					description,
				});
				await saveAttractions.save();
				attractionsInfoLogger.log('info', 'Attraction created! status code: 201');
				res.status(201).json({ message: 'Attraction created successfully!!' }).send();
			} else {
				attractionsErrorLogger.log('error', `${uploadedRes.message}, status code: ${uploadedRes.status}`);
				res.status(uploadedRes.status).json({ message: uploadedRes.message });
			}
		} else {
			attractionsErrorLogger.log('error', `Item already exist (uniqueCode),status code: 409`);
			res.status(409).json({ message: 'Item already exist (uniqueCode)' });
		}
	} catch (error) {
		attractionsErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(500).json(error.message);
	}
};

// update Attraction: (without updating the images - only admin, later on - security)
export const updateAttraction = async (req, res) => {
	try {
		const updates = req.body;
		const options = { new: true };
		const uniqueCode = req.params.uniqueCode;
		const attraction = await Attraction.findOneAndUpdate(
			{
				uniqueCode,
				status: 'available',
			},
			updates,
			options
		);

		if (!attraction) {
			attractionsErrorLogger.log('error', ` Attraction not found status code: 409`);
			res.status(409).json({ message: 'Attraction not found' });
		} else {
			attractionsInfoLogger.log('error', ` Attraction updated status code: 200`);
			res.status(200).json({ message: 'Attraction updated' });
		}
	} catch (error) {
		attractionsErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(500).json(error.message);
	}
};

// delete Attraction:
export const deleteAttraction = async (req, res) => {
	try {
		const { uniqueCode } = req.body;
		const attraction = await Attraction.findOneAndUpdate(
			{
				uniqueCode,
				status: 'available',
			},
			{ status: 'unavailable' },
			options
		);
		if (!attraction) {
			attractionsErrorLogger.log('error', ` Attraction not found/already deleted. status code: 409`);
			res.status(409).json({ message: 'Attraction not found/already deleted' });
		}
	} catch (error) {
		attractionsErrorLogger.log('error', `${error.message}. status code: 500`);
		res.status(500).json(error.message);
	}
};
