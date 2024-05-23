import ctrlWrapper from "../decorators/cntrWrapper.js";
import authService from "../services/authService.js";

const register = async (req, res) => {
	const {name, email, subscription } = await authService.register(req.body);
	res.status(201).json({
		user: {
			email,
			subscription,
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
	const {user, body} = req;
	const {name, email, subscription} = await authService.update(user._id, body);
	res.status(200).json({
		email,
		subscription,
	})
}

const current = async (req, res) => {
	const {name, email, subscription} = req.user;
	res.status(200).json({
		email,
		subscription,
	})
};

export default {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	update: ctrlWrapper(update),
	current: ctrlWrapper(current),
}
