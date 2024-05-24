
import Contact from '../models/Contact.js';

const getContactList = async (filter = {}, options = {}) => await Contact.find(
  filter,
  'name email phone favorite',
  options);

const getContact = async (conditions) => await Contact.findOne(conditions);

const deleteContact = async (conditions) => await Contact.findOneAndDelete(conditions);

const addContact = async (data) => await Contact.create(data);

const updateContact = async (conditions, update) => await Contact.findOneAndUpdate(conditions, update);

export default {
  getContactList,
  getContact,
  deleteContact,
  addContact,
  updateContact,
};
