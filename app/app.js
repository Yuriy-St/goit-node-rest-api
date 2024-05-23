import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRouter from "../routes/authRouter.js";
import contactsRouter from "../routes/contactsRouter.js";
import InvalidUrlError from '../helpers/InvalidUrlError.js';
import ErrorHandler from "../helpers/ErrorHandler.js";

// const configPath = path.resolve('..', 'config', '.env');
// console.log('.env configuration path: ', configPath);
// dotenv.config({ path: configPath });

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(InvalidUrlError);
app.use(ErrorHandler);

export default app;
