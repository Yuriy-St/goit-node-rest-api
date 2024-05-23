import HttpError from "../helpers/HttpError.js";

const validateBody = (schema) => (req, _, next) => {
  if (!Object.keys(req.body).length) {
    next(HttpError(400, 'Body must have at least one field'));
  }

  const { error } = schema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};


export default validateBody;
