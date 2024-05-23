const InvalidUrlError = (_, res) => {
  res.status(404).json({ code: 404, message: 'Path not found' });
};

export default InvalidUrlError;
