
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const conatctsPath = path.resolve('db', 'contacts.json');

/**
 * Gets all contacts from the db
 * @returns {Array} array of contacts
 */
const getContactList = async () => {
  const contactsList = await fs.readFile(conatctsPath, 'utf-8');
  return JSON.parse(contactsList);
}

/**
 * Gets a contact by Id
 * @param {string} contactId
 * @returns {object|string} contact or message if not found
 */
const getContactById = async (contactId) => {
  const contactList = await getContactList();
  const contact = contactList.find(item => item.id === contactId);
  return contact || null;
}

/**
 * Delets contact by Id from the db
 * @param {string} contactId
 * @returns {object|null} deleted contact or null if contact not exists
 */
const removeContact = async (contactId) => {
  const contacts = await getContactList();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) return null;
  const [removedContact] = contacts.splice(idx, 1);
  await updateContactList(contacts);
  return removedContact;
}

/**
 * Adds a contact to the db
 * @param {Object} contact - the contact to be added to the db
 * @param {string} contact.name - the name of the contact
 * @param {string} contact.email - the email of the contact
 * @param {string} contact.phone - the phone of the contact
 * @returns {Object} new contact
 */
const addContact = async ({ name, email, phone }) => {
  const contacts = await getContactList();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContactList(contacts);
  return newContact;
}

/**
 * Adds a contact to the db
 * @param {string} id - the contact id to be updated to the db
 * @param {Object} newContact - updated contact
 * @returns {Object} updated contact
 */
const updateContact = async (id, newContact) => {
  const contacts = await getContactList();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) {
    return null;
  }
  const contact = contacts[idx];
  contacts[idx] = {
    ...contact,
    ...newContact
  };
  await updateContactList(contacts);
  return contacts[idx];
}

/**
 * Helper to update contacts list in the db
 * @param {Array} contactList
 */
const updateContactList = async (contactList) => {
  await fs.writeFile(conatctsPath, JSON.stringify(contactList, null, 2));
}

export default {
  getContactList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
