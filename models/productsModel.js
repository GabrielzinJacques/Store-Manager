const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.query('SELECT * FROM products');
  console.log('depois da model');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.query('SELECT * FROM products WHERE id=?', [id]);
  
  return result[0];
};

module.exports = {
  getAllProducts,
  getById,
};