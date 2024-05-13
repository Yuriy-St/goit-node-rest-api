
import Contact from '../models/Contact.js';

/**
 * Gets all contacts from the db
 * @returns {Array} array of contacts
 */
const getContactList = async () => await Contact.find({});

/**
 * Gets a contact by Id
 * @param {string} contactId
 * @returns {object|null} contact or null if not found
 */
const getContactById = async (contactId) => await Contact.findById(contactId);

/**
 * Delets contact by Id from the db
 * @param {string} contactId
 * @returns {object|null} deleted contact or null if contact not exists
 */
const deleteContact = async (contactId) => await Contact.findByIdAndDelete(contactId);

/**
 * Adds a contact to the db
 * @param {Object} contact - the contact to be added to the db
 * @returns {Object} new contact
 */
const addContact = async (data) => await Contact.create(data);

/**
 * Updates a contact in the db
 * @param {string} id - the contact id to be updated in the db
 * @param {Object} newContact - updated contact
 * @returns {Object} updated contact
 */
const updateContact = async (id, update) => await Contact.findByIdAndUpdate(id, update);

export default {
  getContactList,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
