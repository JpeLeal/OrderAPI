const orderService = require("../services/orderService");

async function createOrder(req, res) { //Chamamento da função de criação de pedidos.
    try {
        await orderService.createOrder(req.body);
        res.status(201).json({ 
            mensagem: `Pedido: ${req.body.numeroPedido} recebido!` // Resposta HTTP 201 - CREATED Confirmando a criação do pedido
        });
    } catch (error) {
        
    if (error.message.includes("Inconsistência de valores")) { // Caso ocorra erro na validação da entrada de valores vai travar aqui e retornar o erro 400 - BAD REQUEST
        return res.status(400).json({
            erro: error.message
        });
    }
        res.status(500).json({  // Se ocorrer um erro interno retorna HTTP 500 - INTERNAL SERVER ERROR
            erro: "Erro ao salvar pedido!"
        });
    }
}

async function getOrderById(req, res) { //Chamamento da função de busca de pedidos pelo orderID
    try { 
        const order = await orderService.getOrderById(req.params.id); 

        if (!order) { //caso não encontre o pedido pelo orderId erro 400 - BAD REQUEST
            return res.status(404).json({erro: "Pedido não encontrado!"});
    }
    return res.status (200).json(order); // Pedido encontrado 
    } catch (error) { //em caso de algum erro interno do servidor.
        return res.status(500).json({
            erro: "Erro na busca do pedido."
        });
    }
}

async function listOrders(req, res) { //Chamamento da função de listagem de pedidos lá do service. responde o código http e o texto.
    try { 
        const orders = await orderService.listOrders(); //chama a função e aguarda o retorno antes de continuar
        return res.status(200).json(orders); // retorna HTTP 200 - OK se der tudo certo e o json com os pedidos
    } catch (error) {//tratamento de erro
        return res.status(500).json({ //caso de erro ao listar pedido http 500 - erro interno.
            erro: "Erro ao listar pedidos"
        });
    }
}

async function deleteOrder(req, res) { //Chamamento da função de deletar de pedidos lá do service.
    try {
        const deleted = await orderService.deleteOrder(req.params.id); //req pega o id que vem na URL /order/:id

        if (!deleted) { //se nenhuma linha foi afetada então nada foi apagado e retorna que não existe pedido com esse nome
            return res.status(404).json({
                erro: "Pedido inexistente!"
            });
        }
        return res.status(200).json({ //se alguma linha foi afetada, então retorna que o pedido foi deletado
            mensagem: "Pedido deletado."
        });
    } catch (error) { //em caso de erro interno retorna http 500
        return res.status(500).json({
            erro: "Erro ao tentar deletar pedido"
        });
    }
}

async function updateOrder(req, res) { //Chamamento da função de atualização de pedidos lá do service. (Função criada recentemente, ainda não implementada no service)
    try { 
        const order = await orderService.updateOrder(req.params.id, req.body); // req.params.id recebe o id da URL e o req.body recebe o json enviado na requisição
        return res.status(200).json(order); //se foi atualizado, retorna http code 200 (OK)
    } catch (error) { // se ocorrer algum erro dentro do service será capturado pelo catch
        if (error.message.includes("Inconsistência de valores")) { //confere se a mensagem de erro se trada de inconsistencia de valor validado na função validateValue
        return res.status(400).json({ //retorna BAD REQUEST - 400. 
            erro: error.message
        });
    }
        return res.status(500).json({
            erro: "Erro ao tentar atualizar pedido" // caso ocorra erro interno
        });
    }
}

module.exports = { createOrder, getOrderById, listOrders, deleteOrder, updateOrder }; //exporta os controllers para ser usado em outro arquivo