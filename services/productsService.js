const productsModel = require('../models/productsModel');

const objError = (status, message) => ({
  status,
  message,
});

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) throw objError(404, 'Product not found');
  return product;
};

module.exports = {
  getAllProducts,
  getById,
};