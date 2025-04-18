const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  pass: '',
  database: 'booking',
})

module.exports = db