//usei o express para criar e configurar meu servidor
const express = require('express')
const server = express()

const db = require('./db.js')

//configurar arquivos estáticos(css,scripts,image)
server.use(express.static('public'))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração do nunkjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  express: server,
  noCache: true
})

//criei uma rota /
//capturo o pedido do cliente para responder
server.get('/', function (req, res) {
  //pegar dados da tabela
  db.all(`SELECT * FROM items`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    return res.render('index.html', { items: rows })
  })
})

server.post('/', function (req, res) {
  //inserir dados na tabela
  const query = `
  INSERT INTO items(
    name
  ) VALUES (?);
  `

  const value = [req.body.item]

  db.run(query, value, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    return res.redirect('/')
  })
})

server.get('/:id', function (req, res) {
  const id = req.params.id
  const query = `
      DELETE FROM items where id = ${id};
  `
  db.run(query, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    return res.redirect('/')
  })
})

//liguei o servidor
server.listen(3000)
