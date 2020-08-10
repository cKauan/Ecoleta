const express = require("express")
const server = express()
// Pegar o banco de dados
const db = require("./database/db.js")

// Configurar Pasta Pública
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))



// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos
// Página inicial
// req: Requisição 
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})
server.get("/create-point", (req, res) => {

    return res.render("create-point.html")

}) 

server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso formulário   
    console.log(req.body);
    //req.query: Query Strings da nossa URL
    console.log(req.body)
    // Inserir dados na tabela
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?); 
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)    
        return res.render("create-point.html", { saved : true })

    }
    db.run(query, values, afterInsertData)

})


server.get("/search-results", (req, res) => {
<<<<<<< HEAD
=======

>>>>>>> 3cf49a7b6502bdd81bf54cefad38b18521ac2f47
    const search = req.query.search
    if (search == "") {
        // Pesquisa vazia 
        return res.render("search-results.html", {total: 0})
    }

    // Pegar os dados do banco de dados 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length
        

        // Mostrar a página html com os dados do banco de dados  
        return res.render("search-results.html", { places: rows, total: total })

    })
})


// Ligar o servidor
server.listen(3000)
