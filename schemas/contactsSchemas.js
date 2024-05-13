import Joi from "joi";
import { EMAIL_REGEXP, PHONE_REGEXP } from "../constants/regExp.js";

export const createContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	phone: Joi.string().pattern(PHONE_REGEXP).required(),
})

export const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(EMAIL_REGEXP),
	phone: Joi.string().pattern(PHONE_REGEXP),
})

export const updateFavoriteSchema = Joi.object({
  favorite: Joi
    .boolean()
    .required()
    .messages({ 'any.required': 'Missing field "favorite"' }),
});
