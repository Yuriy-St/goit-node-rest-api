import contactsService from "../services/contactsService.js";
import ctrlWrapper from "../helpers/cntrWrapper.js";

const getAllContacts = async (req, res) => {
	const data = await contactsService.getContactList();
	res.status(200).json({ code: 200, data });
};

const getOneContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.getContactById(id);

	if (!contact) {
		res.status(404).json({ code: 404, message: 'Not found' });
		return;
	}

	res.status(200).json({ code: 200, data: contact });
};

const deleteContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.removeContact(id);

	if (!contact) {
		res.status(404).json({ code: 404, message: 'Not found' });
		return;
	}

	res.status(200).json({ code: 200, message: 'contact deleted' });
};

const createContact = async (req, res) => {
	const data = await contactsService.addContact(req.body);
	res.status(200).json({ code: 200, data });
};

const updateContact = async (req, res) => {
	const { id } = req.params;
	const contact = await contactsService.updateContact(id, req.body);

	if (!contact) {
		res.status(404).json({ code: 404, message: 'Not found' });
		return;
	}

	res.status(201).json({ code: 201, data: contact });
};

export default {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContact: ctrlWrapper(getOneContact),
	deleteContact: ctrlWrapper(deleteContact),
	createContact: ctrlWrapper(createContact),
	updateContact: ctrlWrapper(updateContact)
}
