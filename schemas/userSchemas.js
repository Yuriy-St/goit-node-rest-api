import Joi from "joi";
import { EMAIL_REGEXP } from "../constants/regExp.js";
import { SUBSCRIPTION } from "../constants/userConstants.js";

const email = Joi.string().pattern(EMAIL_REGEXP).required();
const password = Joi.string().min(6).required();
const subscription = Joi.string().valid(...SUBSCRIPTION);

export const registerUserSchema = Joi.object({
	email,
	password,
	subscription,
});

export const loginUserSchema = Joi.object({
	email,
	password,
})

export const updateUserSchema = Joi.object({
	subscription,
})
