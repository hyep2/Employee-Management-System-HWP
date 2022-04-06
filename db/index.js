const mysql = require('mysql2');

const db = mysql.createConnection('mysql://root:Ihatemath101$@localhost:3306/employeetracker_db');

module.exports = db; 

