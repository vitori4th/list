const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./listTest.db')

db.serialize(function () {
  //criar a tabela
  db.run(`CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
    );
  `)
})

module.exports = db
