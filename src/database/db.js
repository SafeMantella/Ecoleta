//import sqlite
const sqlite3 = require("sqlite3").verbose()

//criar objeto para operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//usar objeto bd para operações
// db.serialize(() => {
    //criar tabelas
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    //inserir dados
    // const query = ` INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?); `
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80",
    //     "Colectoria",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err){//func callback
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    //consultar dados
    // db.all(`SELECT name FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)
    // })


    //deletar dados
//     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("registro deletado com sucesso")
//     })
// })