import contactsService from "../services/contactsService.js";
import ctrlWrapper from "../decorators/cntrWrapper.js";

const getAllContacts = async (req, res) => {
	const data = await contactsService.getContactList();
	res.status(200).json(data);
};

const getOneContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.getContactById(id);

	if (!contact) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.deleteContact(id);

	if (!contact) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	res.status(200).json(contact);
};

const createContact = async (req, res) => {
	const data = await contactsService.addContact(req.body);
	res.status(201).json(data);
};

const updateContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.updateContact(id, req.body);

	if (!contact) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	res.status(200).json(contact);
};

export default {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContact: ctrlWrapper(getOneContact),
	deleteContact: ctrlWrapper(deleteContact),
	createContact: ctrlWrapper(createContact),
	updateContact: ctrlWrapper(updateContact)
}
