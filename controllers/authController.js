import fsPromises from 'fs/promises';
import path from 'path';

import ctrlWrapper from "../decorators/cntrWrapper.js";
import authService from "../services/authService.js";
import gravatar from 'gravatar';
import Jimp from 'jimp';
import HttpError from '../helpers/HttpError.js';
import sendEmail from '../helpers/sendEmail.js';

const { BASE_URL } = process.env;

const sendVerifyEmail = async ({ email, verificationToken }) => {
	const verifyEmail = {
		to: email,
		subject: 'Email verification',
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
	};

	return await sendEmail(verifyEmail);
}

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await authService.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is invalid');
	}
	if (user.verified) {
		throw HttpError(400, 'Verification has already been passed');
	}
	await sendVerifyEmail(user);

	res.status(200).json({
		message: "Verification email sent",
	})
}

const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await authService.findOne({ verificationToken });
	if (!user) {
		throw HttpError(404, 'User not found');
	}

	await authService.update(user._id, {
		verified: true,
		verificationToken: '',
	});

	res.status(200).json({
		message: 'Verification successful',
	})
}

const register = async (req, res) => {
	const { email, subscription, avatarURL, verificationToken } = await authService.register({
		...req.body,
		avatarURL: gravatar.url(req.body.email),
	});

	await sendVerifyEmail({ email, verificationToken });

	res.status(201).json({
		user: {
			email,
			subscription,
			avatarURL,
		}
	});
};

const login = async (req, res) => {
	const user = await authService.login(req.body);
	const { token, verified, email, subscription, avatarURL } = user;

	if (!verified) {
		throw HttpError(401, 'Please verify your email');
	}

	res.status(200).json({
		token,
		user: {
			email,
			subscription,
			avatarURL,
		}
	})
};

const logout = async (req, res) => {
	await authService.logout(req.user._id);
	res.status(204).send();
};

const update = async (req, res) => {
	const { user, body } = req;
	const { email, subscription, avatarURL } = await authService.update(user._id, body);
	res.status(200).json({
		email,
		subscription,
		avatarURL,
	})
}

const current = async (req, res) => {
	const { email, subscription, avatarURL } = req.user;
	res.status(200).json({
		email,
		subscription,
		avatarURL
	})
};

const updateAvatar = async (req, res) => {
	if (!req.file) {
		throw HttpError(400, 'No file attached');
	}
	const { _id } = req.user;
	const { path: tmpPath, filename } = req.file;
	const avatarsDir = path.resolve('public', 'avatars');
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
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}
