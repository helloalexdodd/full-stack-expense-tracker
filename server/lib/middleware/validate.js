module.exports = (validator) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = validator(req.body);
    console.log('error', error);
    if (error) return res.status(404).send(error);
    next();
  };
};
