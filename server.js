const app = require("./src/app");
require("./src/config/dbConfig");
const PORT = 3000

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
})
