import { isValidObjectId } from "mongoose";
import httpError from "../helpers/httpError.js";

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(httpError(400, `${id} is not a valid id`));
  }
  next();
};

export default isValidId;
