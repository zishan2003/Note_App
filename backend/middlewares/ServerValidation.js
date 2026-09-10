const joi = require("joi");

const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ msg: error.details[0].message });
  }
  next();
};

const createValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().min(10).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ msg: error.details[0].message });
  }
  next();
};

module.exports = { registerValidation, createValidation };
