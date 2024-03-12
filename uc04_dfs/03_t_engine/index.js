const express = require ('express')
const exphbs = require ('express-handlebars')

const app = express()

//Criando uma variavel para encontra a pasta views e depois o partial para renderizar a pagina / trocando expphbs por hbss
const hbs = exphbs.create({
    partialsDir: ["views/partials"],
});

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.static("public"))

// chamar página raiz
app.get('/' , function (req , res){
    const user = {
        name: 'Rodolfo',
        surname:'Gonçalves'
    }
    const approved = false;
    //chamando a página em que as funções estão guardadas
    res.render('home',{ user : user , auth: true , approved} )
})

// criando a rota
app.get("/dashboard" , function(req , res){
    const items = ["Item a" , "Item b" , "Item c"]; 
    
    res.render("dashboard", {items: items});
});
// criando a pota da página post
app.get("/post" , function(req , res){
    // chamando a variavel post que está no blogpost.handlebars
    const post = {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação atual.",
        comments : 4,
    }
    // chamando a página
    res.render("blogpost" , {post});
});

// criando a rota do blog
app.get("/blog", function(req , res){
    const posts = [
        {
            title: "Aprender Node.js",
            category: "Node.js",
            body: "Node.js é muito utilizado na programação atual.",
            comments : 4,
        },
        {
            title: "PHP ainda vale a pena?",
            category: "PHP",
            body: "",
            comments : 12,
        },
        {
            title: "Os segredos de JS",
            category: "Javascript",
            body: "",
            comments : 5,
        },
    ];
    //chamando o post
    res.render("blog" , {posts});
});

app.listen(3000)