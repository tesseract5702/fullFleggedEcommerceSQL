const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  port:"3307",
  database: 'ecommerce',
});
module.exports = pool.promise();