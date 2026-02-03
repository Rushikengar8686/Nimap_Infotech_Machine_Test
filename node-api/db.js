const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rushi',  
  database: 'machine_test_db',
  connectionLimit: 10
});

module.exports = pool.promise();
