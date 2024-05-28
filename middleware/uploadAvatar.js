import multer from "multer";
import path from 'path';

const tempDir = path.resolve('tmp');

const storage = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, callback) => {
		const {_id} = req.user;
		const filename = `${_id}_${file.originalname}`;
		callback(null, filename);
	},
});

const uploadAvatar = multer({
	storage
});

export default uploadAvatar.single('avatar');
