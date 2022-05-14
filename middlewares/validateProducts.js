const joi = require('joi');

const body = joi.object({
  name: joi.string().min(5),
  quantity: joi.number().integer().min(1),
});

const validatePro = (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = body.validate({ name, quantity });
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = validatePro;