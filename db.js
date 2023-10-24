const mysql = require('mysql2'); 


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '3431drew', 
  database: 'employee_tracker', 
  connectionLimit: 10,
});

module.exports = db;
