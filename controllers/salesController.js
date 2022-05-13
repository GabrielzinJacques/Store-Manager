const salesService = require('../services/salesService');

const getAllSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
  } catch (err) {
    console.log('Err list sales', err.message);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    return res.status(200).json(sale);
  } catch (err) {
    console.log('Err Id Sales', err.message);
    next(err);
  }
};

module.exports = {
  getAllSales,
  getById,
};