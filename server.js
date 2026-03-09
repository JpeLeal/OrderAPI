const app = require("./src/app"); //importa o app
require("./src/config/dbConfig"); //importa o arquivo de config do db
const PORT = 3000 //definia porta do servidor

app.listen(PORT, () => { //inicia o servidor HTTP e recebe as requisições pela porta
    console.log(`API rodando na porta ${PORT}`); //reposta visual 
})
