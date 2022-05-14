const express = require('express');
const productsController = require('../../controllers/productsController');
const middleware = require('../../middlewares/index');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', 
middleware.valid.validateBodyPro,
middleware.valid.validateProducts,
productsController.createProduct);

module.exports = productsRouter;