const express = require('express');
const salesController = require('../../controllers/salesController');
const middleware = require('../../middlewares/index');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', 
middleware.valid.validateBodySal,
middleware.valid.validateSales,
salesController.createSales);

salesRouter.put('/:id', 
middleware.valid.validateBodySal,
middleware.valid.validateSales,
salesController.updateSales);

module.exports = salesRouter;