const mysql = require('mysql2');

const db = mysql.createConnection('mysql://root:Ihatemath101$@localhost:3306/employeetracker_db');

db.query('SELECT * FROM department', (err,data)=> {
  if (err) {console.log(err)}
  console.log(data)
})