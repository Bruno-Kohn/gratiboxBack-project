import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';

describe('GET /sign-a-plan', () => {
  afterAll(async () => {
    await connection.end();
  });

  it('Returns 200 for object sent properly', async () => {
    const products = await connection.query(`SELECT * FROM products;`);
    const days = await connection.query(`SELECT * FROM delivery_days;`);
    const result = await supertest(app)
      .get('/sign-a-plan')
      .send({ products, days });

    expect(result.status).toEqual(200);
  });
});
