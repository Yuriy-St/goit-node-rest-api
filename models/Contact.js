import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../constants/regExp.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: EMAIL_REGEXP,
    },
    phone: {
      type: String,
      require: true,
      match: PHONE_REGEXP,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', handleSaveError);

export default model('contact', contactSchema);
