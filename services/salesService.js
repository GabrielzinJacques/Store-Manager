const salesModel = require('../models/salesModel');

const objError = (status, message) => ({
  status,
  message,
});

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) throw objError(404, 'Sale not found');
  return sale;
};

const createSales = async (array) => {
  const insertId = await salesModel.insertDate();

  const promisses = array.map(({ productId, quantity }) =>
  salesModel.createSales(insertId, productId, quantity));

  const itemsSold = await Promise.all(promisses);
  
  return {
    id: insertId,
    itemsSold,
  }; 
};

const updateSales = async (id, array) => {
  const promisses = array.map(({ productId, quantity }) =>
  salesModel.updateSale(id, productId, quantity));

  const itemUpdated = await Promise.all(promisses);

  return {
    saleId: id,
    itemUpdated,
  };
};

module.exports = {
  getAllSales,
  getById,
  createSales,
  updateSales,
};