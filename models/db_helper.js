const mysql = require('mysql');
const db = require('../config');
const db = db.database;

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : db.host,
  user            : db.user,
  password        : db.password,
  database        : db.database
});
module.exports = pool;