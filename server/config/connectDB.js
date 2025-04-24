const mysql = require('mysql');

const util = require('util');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking',
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;