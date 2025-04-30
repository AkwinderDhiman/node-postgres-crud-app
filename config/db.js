
const { Pool } = require('pg'); 

const pool = new Pool({
    user: process.env.DB_USER, // Set your PostgreSQL user
    host: process.env.DB_HOST, // Your PostgreSQL server host (e.g., 'localhost')
    database:  process.env.DB_NAME,       // Your database name
    password: process.env.DB_PASSWORD, // Set your PostgreSQL password
    port: process.env.DB_PORT,// PostgreSQL default port
  });

  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
      console.log('Connected to PostgreSQL');
    }
  });
module.exports = pool;
