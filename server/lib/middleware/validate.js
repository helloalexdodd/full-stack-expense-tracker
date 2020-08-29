module.exports = (validator) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = validator(req.body);
    if (error) return res.status(404).send(error);
    next();
  };
};
