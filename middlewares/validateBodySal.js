const joi = require('joi');

const body = joi.array().items(
  joi.object({
    productId: joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: joi.number().required().messages({
      'any.required': '"quantity" is required',
    }),
  }),
);

const validateBody = (req, res, next) => {
  const { error } = body.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validateBody;