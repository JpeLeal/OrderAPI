require("dotenv").config(); // Carrega as variáveis do .env
const { Pool } = require("pg"); //importa o pool da biblioteca do postgresql para gerenciar conexoes com o db

const pool = new Pool({ //cria a nova instancia do pool, usado pra consultar o banco usando as váriaveis definidas no .env
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool; //depois da criação exporta o pool pra ser usado nos outros arquivos do projeto

pool.connect() // estabelece a conexão com o banco de dados
    .then(() => { //resposta caso conexao bem sucedida
        console.log("Conectado ao PostgreSQL");
    })
    .catch((err) => { //resposta caso não conecte
        console.error("Erro ao conectar:", err);
    });