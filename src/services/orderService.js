const pool = require("../config/dbConfig");

async function createOrder(order) {
    const { numeroPedido, valorTotal, dataCriacao, items } = order;

     // 1. Validação de Consistência: Calcula a soma real dos itens
    const somaRealItens = items.reduce((total, item) => {
        return total + (item.quantidadeItem * item.valorItem);
    }, 0);

    // 2. Compara com o valorTotal enviado
    if (somaRealItens !== valorTotal) {
        const erroMsg = `Inconsistência de valores: O total enviado (${valorTotal}) não bate com a soma dos itens (${somaRealItens}).`;
        console.error(erroMsg);
        throw new Error(erroMsg); // Interrompe a execução aqui
    }

    const client = await pool.connect(); // Pega uma conexão do pool

    try {
        await client.query('BEGIN'); // Inicia a transação

        // 1. Insere o Pedido
        await client.query(
            `INSERT INTO "Order" (orderID, value, creationDate) VALUES ($1, $2, $3)`,
            [numeroPedido, valorTotal, dataCriacao]
        );

        // 2. Insere os Itens
        for (const item of items) {
            await client.query(
                `INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)`,
                [numeroPedido, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

        await client.query('COMMIT'); // Salva tudo permanentemente
    } catch (error) {
        await client.query('ROLLBACK'); // Se der erro em qualquer parte, desfaz tudo
        console.error("Erro ao processar pedido:", error);
        throw error;
    } finally {
        client.release(); // Devolve a conexão para o pool
    }
}

module.exports = { createOrder };