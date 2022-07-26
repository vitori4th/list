const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./listTest.db')

db.serialize(function () {
  //criar a tabela
  db.run(
    `CREATE TABLE IF NOT EXISTS lists(
    id_list INTEGER PRIMARY KEY AUTOINCREMENT,
    name_list TEXT 
    );
  `,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS items(
     id_item INTEGER PRIMARY KEY AUTOINCREMENT,
     name_item TEXT,
     done TEXT,
     id_list INTEGER,
     FOREIGN KEY (id_list) REFERENCES lists(id_list)
     );
   `,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
})

module.exports = db
