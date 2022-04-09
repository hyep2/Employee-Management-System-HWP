require('dotenv').config()

const mysql = require('mysql2');

const db = mysql.createConnection(process.env.LOCAL_URL);

module.exports = db; 

