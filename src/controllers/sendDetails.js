import connection from '../database.js';

async function sendDetails(req, res) {
  const { radioDay, Cha, Incenso, Produto, endereco } = req.body;

  try {
    let plano;

    if (radioDay === 1 || radioDay === 2 || radioDay === 3) {
      plano = 'Semanal';
    } else {
      plano = 'Mensal';
    }
    const products = [];

    if (Cha) {
      products.push('Chá');
    }
    if (Incenso) {
      products.push('Incenso');
    }
    if (Produto) {
      products.push('Produtos orgânicos');
    }

    const address = await connection.query(
      `SELECT * FROM user_data WHERE address = $1`,
      [endereco]
    );
    const addressId = address.rows[0].id;

    const data = await connection.query(
      `
      SELECT * FROM plans WHERE adress_id = $1`,
      [addressId]
    );

    return res.send([
      {
        info: 'Plano',
        infoback: plano
      },
      {
        info: 'Data da assinatura',
        infoback: data.rows[0].subscription_date
      },
      {
        info: 'Próximas entregas',
        infoback: ' Ta vindo do back'
      },
      {
        info: 'Produtos',
        infoback: products
      }
    ]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default sendDetails;
