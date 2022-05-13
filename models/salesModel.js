const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.query(`SELECT SA.id AS saleId, 
  SA.date, PR.id AS productId, SP.quantity AS quantity FROM sales_products AS SP
  INNER JOIN sales AS SA
  ON SA.id = SP.sale_id
  INNER JOIN products AS PR
  ON PR.id = SP.product_id;`);
  return result;
};

const getById = async (id) => {
  const [result] = await connection.query(`SELECT SA.date, PR.id AS productId,
  SP.quantity FROM sales_products AS SP
  INNER JOIN sales as SA
  ON SA.id = SP.sale_id
  INNER JOIN products as PR 
  ON PR.id = SP.product_id
  WHERE SA.id = ?`, [id]);
  return result;
};

module.exports = {
  getAllSales,
  getById,
};