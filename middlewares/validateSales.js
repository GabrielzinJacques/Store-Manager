const joi = require('joi');

const body = joi.array().items(
  joi.object({
    productId: joi.number().min(1),
    quantity: joi.number().min(1).messages({
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
  }),
);

const validateSale = (req, res, next) => {
  const { error } = body.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = validateSale;