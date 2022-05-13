const productsService = require('../services/productsService');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();

    return res.status(200).json(products);
  } catch (err) {
    console.log('Err list Products', err.message);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    return res.status(200).json(product);
  } catch (err) {
    console.log('Err Id Product', err.message);
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getById,
};