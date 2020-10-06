const mysql = require('mysql');

const dbUrl = process.env.DATABASE_URI;

let connection = mysql.createPool(dbUrl);

module.exports = connection;