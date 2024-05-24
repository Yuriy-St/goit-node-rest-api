import express from "express";
import contactsController from "../controllers/contactsController.js";
import validateBody from "../decorators/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import isValidID from '../middleware/isValidId.js';
import authenticate from "../middleware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAllContacts);
contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.get("/:id", isValidID, contactsController.getOneContact);
contactsRouter.delete("/:id", isValidID, contactsController.deleteContact);
contactsRouter.patch("/:id", isValidID, validateBody(updateContactSchema), contactsController.updateContact);

contactsRouter.patch("/:id/favorite", isValidID, contactsController.updateFavorite);

export default contactsRouter;
