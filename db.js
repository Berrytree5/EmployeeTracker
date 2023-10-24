const mysql = require('mysql2'); 


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '3431drew', 
  database: 'db-store', 
  connectionLimit: 10,
});

module.exports = db;
