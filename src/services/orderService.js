const pool = require("../config/dbConfig");

async function createOrder(order) { // Função de criação de pedido.
    const { numeroPedido, valorTotal, dataCriacao, items } = order;

    validateValue(items, valorTotal); //Chama função para validação do valor de entrada.

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); //Inicia a query de inserção de dados no banco

        await client.query( //primeiro insere na tabela Order
            `INSERT INTO "Order" (orderid, value, creationdate)
             VALUES ($1, $2, $3)`,
            [numeroPedido, valorTotal, dataCriacao]
        );

        for (const item of items) { //depois insere os itens na tabela items, tendo orderId como PK pra linkar com a tabela Order
            await client.query(
                `INSERT INTO Items (orderid, productid, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [numeroPedido, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

        await client.query("COMMIT"); //commita 
    } catch (error) { //tratamento do erro
        await client.query("ROLLBACK"); // em caso de erro, qualquer alteração é desfeita
        console.error("Erro ao processar pedido:", error); //retorna o erro
        throw error;
    } finally {
        client.release();
    }
}

async function getOrderById(orderId) { //Criação da função de busca de pedidos pelo ID
    const orderResult = await pool.query( //Faz a busca no banco pelo pedido, filtrando por orderId
        `SELECT orderId, value, creationDate
         FROM "Order"
         WHERE orderId = $1`,
        [orderId]
    );
    if (orderResult.rows.length === 0) { //Caso não haja retorno de pedido 
        return null; // impossivel encontrar o pedido
    }
    const itemsResult = await pool.query( //Caso o pedido exista, faz a busca pelos items do pedido na tabela Items.
        `SELECT productId, quantity, price
         FROM Items
         WHERE orderId = $1`,
        [orderId]
    );
    return { //Retorna o corpo do pedido. no padrão do json recebido
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
    const result = await pool.query( //Query para retorno dos dados do banco.
        `SELECT orderId, value, creationDate
         FROM "Order"
         ORDER BY creationDate DESC`
    );
    return result.rows; //retorna as linhas encontradas na busca - que devem ser os pedidos.
}

async function deleteOrder(orderId) { //Criação da função de deletar pedidos no banco.
    await pool.query( //query para apagar primeiro no items pois tem FK da tabela "Order", filtrando pelo orderId 
        `DELETE FROM Items
         WHERE orderId = $1`,
        [orderId]
    );

    const result = await pool.query( //Depois de apagar itens da tabela items apaga o pedido da tabela "Order"
        `DELETE FROM "Order"
         WHERE orderId = $1`,
        [orderId]
    );

    return result.rowCount; //retorna uma contagem das linhas afetadas
}

async function updateOrder(orderId, body) { //Criação da função para atualizar pedidos no banco.
    const client = await pool.connect();

    try {
        validateValue(body.items, body.valorTotal); //chama função para validar o valor total

        await client.query("BEGIN");

        await client.query( //query de atualização do valor total de acordo com a edição do pedido
            `UPDATE "Order"
             SET value = $1,
             creationdate = $2
             WHERE orderid = $3`,
            [body.valorTotal, body.dataCriacao, orderId]
        );

        await client.query( // Apaga os registros de itens relacionados ao orderId do pedido editado
            `DELETE FROM Items
             WHERE orderid = $1`,
            [orderId]
        );
        for (const item of body.items) { //Inclui novos itens de acordo com o novo body pois podem haver novos itens.
            await client.query(
                `INSERT INTO Items
                 (orderid, productid, quantity, price)
                 VALUES ( $1, $2, $3, $4)`,
                [orderId, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

        await client.query("COMMIT"); //junta tudo e commita

        return {mensagem: "Pedido Atualizado"}; //mensagem de confirmação

    } catch (error) { // em caso de erro no try, é desfeita qualquer alteração incompleta
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }

}

function validateValue(items, valorTotal) { //Função para validação dos valores de entrada.

    const somaRealItens = items.reduce((total, item) => { // Soma dos valores real dos itens
        return total + (item.quantidadeItem * item.valorItem);
    }, 0);

    if (somaRealItens !== valorTotal) { // confere se a soma total dos itens bate com o valor total do pedido
        const erroMsg = `Inconsistência de valores: O total enviado (${valorTotal}) não bate com a soma dos itens (${somaRealItens}).`; //validação da entrada do valor. se não for igual ao valor total, retorna erro
        console.error(erroMsg); // se os valores não bater retorna o erro 
        throw new Error(erroMsg);
    }
    return true;
}

module.exports = { createOrder, getOrderById, listOrders, deleteOrder, updateOrder };


