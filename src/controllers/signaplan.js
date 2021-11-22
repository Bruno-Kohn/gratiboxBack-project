import connection from '../database.js';

async function postSignAPlan(req, res) {
  const {
    radioDay,
    Cha,
    Incenso,
    Produto,
    cep,
    cidade,
    estado,
    endereco,
    nome
  } = req.body;

  try {
    await connection.query(
      `INSERT INTO user_data (address, zip_code, city, state, name) VALUES ($1, $2, $3, $4, $5)`,
      [endereco, cep, cidade, estado, nome]
    );

    const address = await connection.query(
      `SELECT * FROM user_data WHERE address = $1`,
      [endereco]
    );
    const addressId = address.rows[0].id;

    await connection.query(
      `INSERT INTO plans (delivery_days_id, adress_id) VALUES ($1, $2)`,
      [radioDay, addressId]
    );

    const plan = await connection.query(
      `SELECT * FROM plans WHERE adress_id = $1`,
      [addressId]
    );

    const planId = plan.rows[0].id;

    if (Cha) {
      const idCha = await connection.query(
        `SELECT * FROM products WHERE product_name = $1`,
        ['Chá']
      );

      const chaId = idCha.rows[0].id;

      await connection.query(
        `
      INSERT INTO plans_products (products_id, plans_id) VALUES ($1, $2)`,
        [chaId, planId]
      );
    }

    if (Incenso) {
      const idIncenso = await connection.query(
        `SELECT * FROM products WHERE product_name = $1`,
        ['Incenso']
      );
      const incensoId = idIncenso.rows[0].id;

      await connection.query(
        `
      INSERT INTO plans_products (products_id, plans_id) VALUES ($1, $2)`,
        [incensoId, planId]
      );
    }
    if (Produto) {
      const idProduto = await connection.query(
        `SELECT * FROM products WHERE product_name = $1`,
        ['Produtos orgânicos']
      );
      const produtoId = idProduto.rows[0].id;

      await connection.query(
        `
      INSERT INTO plans_products (products_id, plans_id) VALUES ($1, $2)`,
        [produtoId, planId]
      );
    }

    return res.sendStatus(200).send(planId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default postSignAPlan;
