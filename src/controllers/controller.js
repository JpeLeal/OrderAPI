const orderService = require("../services/orderService");

async function createOrder(req, res) { //Chamamento da função de criação de pedidos lá do service.
    try {
        await orderService.createOrder(req.body);
        res.status(201).json({ 
            mensagem: `Pedido ${req.body.numeroPedido} recebido!`
        });
    } catch (error) {
        
    if (error.message.includes("Inconsistência de valores")) {
        return res.status(400).json({
            erro: error.message
        });
    }
        res.status(500).json({
            erro: "Erro ao salvar pedido!"
        });
    }
}

async function getOrderById(req, res) { //Chamamento da função de busca de pedidos pelo ID lá do service.
    try {
        const order = await orderService.getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({erro: "Pedido não encontrado!"});
    }
    return res.status (200).json(order);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro na busca do pedido."
        });
    }
}

async function listOrders(req, res) { //Chamamento da função de listagem de pedidos lá do service.
    try {
        const orders = await orderService.listOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao listar pedidos"
        });
    }

}

async function deleteOrder(req, res) { //Chamamento da função de deletar de pedidos lá do service.
    try {
        const deletd = await orderService.deleteOrder(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                erro: "Pedido inexistente!"
            });
        }
        return res.status(200).json({
            mensagem: "Pedido deletado."
        });
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao tentar deletar pedido"
        });
    }
}

async function updateOrder(req, res) { //Chamamento da função de atualização de pedidos lá do service. (Função criada recentemente, ainda não implementada no service)
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao tentar atualizar pedido"
        });
    }
}

module.exports = { createOrder, getOrderById, listOrders, deleteOrder, updateOrder };