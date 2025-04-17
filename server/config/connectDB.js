const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  pass: '',
  database: 'users',
})

module.exports = db