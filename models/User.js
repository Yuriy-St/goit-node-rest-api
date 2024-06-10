import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../constants/regExp.js';
import { SUBSCRIPTION } from '../constants/userConstants.js';

Schema.Types.String.checkRequired(v => v != null);

const userSchema = new Schema(
	{
		password: {
			type: String,
			minLength: 6,
			required: [true, 'Password is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			match: EMAIL_REGEXP,
		},
		subscription: {
			type: String,
			enum: SUBSCRIPTION,
			default: "starter"
		},
		token: {
			type: String,
			default: '',
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
{ versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

export default model('user', userSchema);
