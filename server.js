const app = require("./src/app"); //importa o app
require("./src/config/dbConfig"); //importa o arquivo de config do db

const swaggerUi = require("swagger-ui-express"); 
const swaggerFile = require("./swagger-output.json");

const PORT = process.env.PORT //define porta do servidor de acordo com o que está no .env

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); //rota de documentação

app.listen(PORT, () => { //inicia o servidor HTTP e recebe as requisições pela porta
    console.log(`API rodando na porta ${PORT}`); //reposta visual 
})
