const validateBodyPro = require('./validateBodyPro');
const validateProducts = require('./validateProducts');
const validateBodySal = require('./validateBodySal');
const validateSales = require('./validateSales');

module.exports = {
  valid: {
    validateBodyPro,
    validateProducts,
    validateBodySal,
    validateSales,
  },
};