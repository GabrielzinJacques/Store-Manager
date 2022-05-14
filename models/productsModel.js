const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.query('SELECT * FROM products');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.query('SELECT * FROM products WHERE id=?', [id]);
  return result[0];
};

const getByName = async (name) => {
  const [result] = await connection.query('SELECT * FROM products WHERE name=?', [name]);
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

const updateProduct = async (name, quantity, id) => {
  await connection.query(`UPDATE products
  SET name=?,
  quantity=?
  WHERE id=?`, [name, quantity, id]);
  
  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.query(`DELETE FROM products
  WHERE id=?`, [id]);
  console.log(affectedRows);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getById,
  getByName,
  createProduct,
  updateProduct,
  deleteProduct,
};