import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";

const authenticate = async (token) => {
	const { SECRET_KEY } = process.env;
	const { id } = jwt.verify(token, SECRET_KEY);
	return await User.findById(id);
};

const register = async (body) => {
	const { email, password } = body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	return await User.create({
		...body,
		password: hashedPassword,
	});
};

const login = async ({ email, password }) => {
	const { SECRET_KEY } = process.env;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = {
		id: user._id,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
	return await User.findByIdAndUpdate(user._id, { token })
};

const update = async (id, body) => await User.findByIdAndUpdate(id, body);

const logout = async (id) => await User.findByIdAndUpdate(id, { token: '' });

export default {
	authenticate,
	register,
	login,
	logout,
	update,
};
