const db = require ('./db');


db.query('SELECT * FROM department', (err, data) => {
  if (err) { console.log(err) }
  console.log(data)
})