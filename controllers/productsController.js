const productsService = require('../services/productsService');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.log('Err list Products', error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log('Err Id Product', error.message);
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const NewProduct = await productsService.createProduct(name, quantity);
    return res.status(201).json(NewProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const product = await productsService.updateProduct(name, quantity, id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productsService.deleteProduct(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};