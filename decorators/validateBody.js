import httpError from "../helpers/httpError.js";

const validateBody = (schema) => (req, _, next) => {
  if (!Object.keys(req.body).length) {
    next(httpError(400, 'Body must have at least one field'));
  }

  const { error } = schema.validate(req.body);
  if (error) {
    next(httpError(400, error.message));
  }
  next();
};


export default validateBody;
