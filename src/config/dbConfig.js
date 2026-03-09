require("dotenv").config(); // Carrega as variáveis do .env
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;

pool.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL");
    })
    .catch((err) => {
        console.error("Erro ao conectar:", err);
    });