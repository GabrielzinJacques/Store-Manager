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

// Lançando o error de uma forma diferente 

const createProduct = async (name, quantity) => {
  const isProduct = await productsModel.getByName(name);
  if (isProduct) {
    const error = { status: 409, message: 'Product already exists' };
    throw error;
  }
  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (name, quantity, id) => {
  const isProduct = await productsModel.getById(id);
  console.log('id:', isProduct);
  if (!isProduct) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  const upProduct = await productsModel.updateProduct(name, quantity, id);
  return upProduct;
};

const deleteProduct = async (id) => {
  const isProduct = await productsModel.getById(id);
  if (!isProduct) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};