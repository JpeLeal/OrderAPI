const express = require("express") //importação do express para gerenciar rotas e o servidor

const orderRoutes = require("./routes/orderRoutes") //importa rotas de pedidos

const app = express() //cria a aplicação do express

app.use(express.json()) //permite a API entender requisição com JSON

app.use("/order", orderRoutes) //definição do prefixo das rotas de pedidos 

module.exports = app //exporta pra usar em outro arquivo