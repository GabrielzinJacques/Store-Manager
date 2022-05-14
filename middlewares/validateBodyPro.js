const joi = require('joi');

const body = joi.object({
  name: joi.string().required(),
  quantity: joi.number().required(),
});

const validateBody = (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = body.validate({ name, quantity });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validateBody;