import httpError from '../helpers/httpError';

const validateContact = schema => (req, _, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    next(httpError(400, error.message));
  }

  next();
};

export default validateContact;
