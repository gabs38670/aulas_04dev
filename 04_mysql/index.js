const express = require ("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// a página ler as informações
app.use(express.urlencoded({
    extended: true ,
    }),
)

//utilizar o json para capturar
app.use(express.json())

app.get('/',function(req, res){
    res.render('home')
})

//criando a rota para trazer uma informação do mysql
app.get('/books', function(req , res){
    const query = `SELECT * FROM books`

    conn.query(query, function (err, data){
       if(err) {
        console.log(err)
       }
       const books = data
       res.render('books' , {books})
    })

})

// criando rota da selcão dos livros
app.get('/books/:id', function(req ,res){
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id =${id}`
    
    conn.query(query, function (err, data){
        if(err) {
         console.log(err)
        }
        const book = data[0]
        console.log(data[0])
        res.render('book' , { book })
     })
})

// rota de edição de titulo e numero de páginas do livro
app.post('/books/updatebook', function (req , res){
const id = req.body.id
const title = req.body.title
const pageqty = req.body.pageqty

const query = `UPDATE books SET title = '${title}, pageqty = '${pageqty} WHERE id ${id}'`

conn.query(query, function (err){
    if(err) {
     console.log(err)
    }
    res.render(`/books/edit/${id}`)
 })

})


// criando uma conexão com mysql e chamando o sql
const conn = mysql.createConnection({
    host: 'localhost' ,
    user: 'root',
    password: '',
    database: 'nodemysql'   
})

// criando a capturar do mysql book  criando as variaveis inserindo elas agregando valor para cadastrar
app.post('/books/insertbook', function( req , res){
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title , pageqty) value ('${title}' , ${pageqty})`

    conn.query(query , function (err){
        if(err){
            console.log(err)
        }

        res.render('/')
    })
})



//conectando mysql e a porta
conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('Conectado ao MySQL')

    app.listen(3000)
})