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

const getByName = async (name) => {
  const [result] = await connection.query('SELECT * FROM products WHERE name=?', [name]);
  console.log(result);
  return result[0];
};

const createProduct = async (name, quantity) => {
  const [{ insertId }] = await connection.query(`INSERT INTO products (name, quantity) 
  VALUES (?, ?)`, [name, quantity]);
  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAllProducts,
  getById,
  getByName,
  createProduct,
};