import Joi from "joi";
import { EMAIL_REGEXP, PHONE_REGEXP } from "../constants/regExp.js";

const name = Joi.string();
const email = Joi.string().pattern(EMAIL_REGEXP);
const phone = Joi.string().pattern(PHONE_REGEXP);

export const createContactSchema = Joi.object({
	name: name.required(),
	email: email.required(),
	phone: phone.required(),
})

export const updateContactSchema = Joi.object({
	name,
	email,
	phone,
})
