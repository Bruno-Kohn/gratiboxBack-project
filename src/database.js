import './setup.js';
import pg from 'pg';

const { Pool } = pg;

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
};

if (process.env.NODE_ENV === 'prod') {
  config = {
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };
}

console.log(config);
const connection = new Pool(config);

export default connection;

// Colocar connectionString para rodar o Heroku
