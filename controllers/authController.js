import fsPromises from 'fs/promises';
import path from 'path';

import ctrlWrapper from "../decorators/cntrWrapper.js";
import authService from "../services/authService.js";
import gravatar from 'gravatar';
import Jimp from 'jimp';

const register = async (req, res) => {
	const { email, subscription, avatarURL } = await authService.register({
		...req.body,
		avatarURL: gravatar.url(req.body.email),
	});
	res.status(201).json({
		user: {
			email,
			subscription,
			avatarURL,
		}
	});
};

const login = async (req, res) => {
	const { token, email, subscription } = await authService.login(req.body);
	res.status(200).json({
		token,
		user: {
			email,
			subscription,
		}
	})
};

const logout = async (req, res) => {
	await authService.logout(req.user._id);
	res.status(204).send();
};

const update = async (req, res) => {
	const { user, body } = req;
	const { email, subscription } = await authService.update(user._id, body);
	res.status(200).json({
		email,
		subscription,
	})
}

const current = async (req, res) => {
	const { email, subscription } = req.user;
	res.status(200).json({
		email,
		subscription,
	})
};

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tmpPath, filename } = req.file;
	const avatarsDir = path.resolve('public','avatars');
	await resizeAvatar(tmpPath);
	const avatarPath = path.join(avatarsDir, filename);
	await fsPromises.rename(tmpPath, avatarPath);
	const avatarURL = path.join('avatars', filename);
	await authService.update(_id, { avatarURL });

	res.status(200).json({
		avatarURL,
	})
}

const resizeAvatar = async (avatarPath) => {
	const avatar = await Jimp.read(avatarPath);
	await avatar.resize(250, 250).writeAsync(avatarPath);
}

export default {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	update: ctrlWrapper(update),
	current: ctrlWrapper(current),
	updateAvatar: ctrlWrapper(updateAvatar),
}
