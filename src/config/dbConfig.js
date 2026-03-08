const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "!@#4",
    database: "Orderdb",
    port: 5432
});

module.exports = pool;

pool.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL");
    })
    .catch((err) => {
        console.error("Erro ao conectar:", err);
    });