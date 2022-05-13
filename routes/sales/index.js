const express = require('express');
const salesController = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getById);

module.exports = salesRouter;