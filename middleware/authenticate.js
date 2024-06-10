import HttpError from "../helpers/HttpError.js";
import AuthSercive from '../services/authService.js';

const authenticate = async (req, res, next) => {
	const {authorization = ''} = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer' || !token) {
		return next(HttpError(401));
	}

	try {
		const user = await AuthSercive.authenticate(token);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401));
		}
		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401, error.message));
	}
};

export default authenticate;
