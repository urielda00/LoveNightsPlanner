import fs from 'fs';
import path from 'path';

const saveImagesNew = async (req) => {
	if (req.files && req.files.length > 0) {
		const filesNamesArr = [];
		const validationErrors = [];
		const MAX_SIZE = 10 * 1024 * 1024; // 5MB
		const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

		req.files.forEach((file) => {
			// Check file size
			if (file.size > MAX_SIZE) {
				validationErrors.push(`Some file exceeds the maximum size of 5MB.`);
			}

			// Check file extension
			const extname = path.extname(file.originalname).toLowerCase();
			if (!ALLOWED_EXTENSIONS.includes(extname)) {
				validationErrors.push(`Some file has an invalid file type. Only images are allowed.`);
			}
		});

		// return errors:
		if (validationErrors.length > 0) {
			return { status: 400, message: 'Some files do not meet the validation criteria.', errors: validationErrors, files: false };
		}

		// if all good, go ahead and save:
		const savePromises = req.files.map((file) => {
			return new Promise((resolve, reject) => {
				// create a unique file name
				const filePath = `uploads/${Date.now()}-${file.originalname}`;

				// write the buffer to the file
				fs.writeFile(filePath, file.buffer, (err) => {
					if (err) {
						reject(err); // error in saving
					} else {
						filesNamesArr.push(filePath); // add the file path to the arr
						resolve(); // the save is completed
					}
				});
			});
		});

		try {
			// wait for all the uploads to be done
			await Promise.all(savePromises);
			// if finished with no error, return the next object:
			return { status: 200, message: 'Files uploaded successfully', files: filesNamesArr, err: false };
		} catch (err) {
			console.log('err: ' + err);
			// if there was an error in saving, return the next object:
			return { status: 500, message: 'Error saving files', err: err.message, files: false };
		}
	} else {
		// if there are no files:
		return { status: 400, message: 'No files uploaded', files: false, err: false };
	}
};

export default saveImagesNew;
