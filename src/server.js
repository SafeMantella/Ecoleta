const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//usando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {//pasta HTML, objeto{}
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//home page
server.get("/", (req, res) => { //req: requisição, res: resposta
    return res.render("index.html", {title: "Um título"}) //sendFile caso nunjucks não seja usado
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.query: query strings da URL
    
    //inserir dados no BD
    const query = ` INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?); `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){//func callback
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    //puxar dados do BD
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log(rows)
        const total = rows.length
        //mostrar página html com os dados do BD
        return res.render("search-results.html", { places: rows, total: total})
    })
})

//ligar servidor
server.listen(3000)