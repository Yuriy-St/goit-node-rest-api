import express from "express";
import contactsController from "../controllers/contactsController.js";
import validateBody from "../decorators/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import isValidID from '../middleware/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidID, contactsController.getOneContact);

contactsRouter.delete("/:id", isValidID, contactsController.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put("/:id", isValidID, validateBody(updateContactSchema), contactsController.updateContact);

contactsRouter.patch("/:id/favorite", isValidID, validateBody(updateFavoriteSchema), contactsController.updateContact);

export default contactsRouter;
