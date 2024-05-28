import express from 'express';

import { registerUserSchema, loginUserSchema, updateUserSchema } from '../schemas/userSchemas.js';
import authenticate from '../middleware/authenticate.js';
import validateBody from '../decorators/validateBody.js';
import authController from '../controllers/authController.js';
import uploadAvatar from '../middleware/uploadAvatar.js';


const authRouter = express.Router();

authRouter.patch('/', authenticate, validateBody(updateUserSchema), authController.update);

authRouter.post('/register', validateBody(registerUserSchema), authController.register);

authRouter.post('/login', validateBody(loginUserSchema), authController.login);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.get('/current', authenticate, authController.current);

authRouter.patch('/avatars', authenticate, uploadAvatar, authController.updateAvatar);

export default authRouter;
