const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'berrytree5',
  password: 'asd123',
  database: 'smokietracker',
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
