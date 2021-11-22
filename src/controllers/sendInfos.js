import connection from '../database.js';

async function sendInfos(req, res) {
  try {
    const products = await connection.query(`SELECT * FROM products;`);
    const days = await connection.query(`SELECT * FROM delivery_days;`);
    return res.send({ products, days }).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default sendInfos;
