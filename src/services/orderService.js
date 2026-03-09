const pool = require("../config/dbConfig");

async function createOrder(order) {
    const { numeroPedido, valorTotal, dataCriacao, items } = order;

    const somaRealItens = items.reduce((total, item) => {
        return total + (item.quantidadeItem * item.valorItem);
    }, 0);

    if (somaRealItens !== valorTotal) {
        const erroMsg = `Inconsistência de valores: O total enviado (${valorTotal}) não bate com a soma dos itens (${somaRealItens}).`;
        console.error(erroMsg);
        throw new Error(erroMsg);
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(
            `INSERT INTO "Order" (orderid, value, creationdate)
             VALUES ($1, $2, $3)`,
            [numeroPedido, valorTotal, dataCriacao]
        );

        for (const item of items) {
            await client.query(
                `INSERT INTO Items (orderid, productid, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [numeroPedido, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Erro ao processar pedido:", error);
        throw error;
    } finally {
        client.release();
    }
}

async function getOrderById(orderId) { //Criação da função de busca de pedidos pelo ID
    const orderResult = await pool.query(
        `SELECT orderId, value, creationDate
         FROM "Order"
         WHERE orderId = $1`,
        [orderId]
    );
    if (orderResult.rows.length === 0) {
        return null; // impossivel encontrar o pedido
    }
    const itemsResult = await pool.query(
        `SELECT productId, quantity, price
         FROM Items
         WHERE orderId = $1`,
        [orderId]
    );
    return {
        orderId: orderResult.rows[0].orderId,
        value: Number(orderResult.rows[0].value),
        creationDate: orderResult.rows[0].creationDate,
        items: itemsResult.rows.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: Number(item.price)
        }))
    };
}

async function listOrders() { //Criação da função de listagem de pedidos.
    const result = await pool.query(
        `SELECT orderId, value, creationDate
         FROM "Order"
         ORDER BY creationDate DESC`
    );
    return result.rows;
}

async function deleteOrder(orderId) { //Criação da função de deletar pedidos no banco.
    await pool.query(
        `DELETE FROM Items
         WHERE orderId = $1`,
        [orderId]
    );

    const result = await pool.query(
        `DELETE FROM "Order"
         WHERE orderId = $1`,
        [orderId]
    );

    return result.rowCount;
}

async function updateOrder(orderId, body) { //Criação da função para atualizar pedidos no banco.
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(
            `UPDATE "Order"
             SET value = $1,
             creationdate = $2
             WHERE orderid = $3`,
            [body.valorTotal, body.dataCriacao, orderId]
        );

        await client.query(
            `DELETE FROM Items
             WHERE orderid = $1`,
            [orderId]
        );
        for (const item of body.items) {
            await client.query(
                `INSERT INTO Items
                 (orderid, productid, quantity, price)
                 VALUES ( $1, $2, $3, $4)`,
                [orderId, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

        await client.query("COMMIT");

        return {mensagem: "Pedido Atualizado"};

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }

}

module.exports = { createOrder, getOrderById, listOrders, deleteOrder, updateOrder };


