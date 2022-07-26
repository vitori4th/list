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

server.get('/', function (req, res) {
  let lists
  //pegar dados da tabela
  db.all(`SELECT * FROM lists`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    lists = rows
  })
  db.all(`SELECT * FROM items`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }
    return res.render('index.html', { lists: lists, items: rows })
  })
})

server.post('/:id_list', function (req, res) {
  const id_list = req.params.id_list

  //inserir dados na tabela
  const query = `
  INSERT INTO items(
    name_item,
    done,
    id_list
  ) VALUES (?,?,?);
  `

  const value = [req.body.item, , id_list]

  db.run(query, value, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    return res.redirect('/')
  })
})

server.get('/:id_item', function (req, res) {
  const id_item = req.params.id_item
  const query = `
      DELETE FROM items WHERE id_item = "${id_item}";
  `
  db.run(query, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    return res.redirect('/')
  })
})

server.post('/', function (req, res) {
  //inserir dados na tabela
  const query = `
  INSERT INTO lists(
    name_list
  ) VALUES (?);
  `

  const value = [req.body.list]

  db.run(query, value, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    return res.redirect('/')
  })
})

server.get('/delete/:id_list', function (req, res) {
  const id_list = req.params.id_list
  const query = `
      DELETE FROM lists WHERE id_list = "${id_list}";
      DELETE FROM items WHERE id_list = "${id_list}";
  `
  db.run(query, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    return res.redirect('/')
  })
})

server.post('/status/:id_item', function (req, res) {
  const id_item = req.params.id_item
  let status = req.body.checkbox

  if (status == '') {
    status = 'checked'
  } else {
    status = ''
  }
  const query = `
        UPDATE items SET done = "${status}" WHERE id_item ="${id_item}";
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
