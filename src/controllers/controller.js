const orderService = require("../services/orderService");

async function createOrder(req, res) {
    try {
        await orderService.createOrder(req.body);
        res.status(201).json({ 
            mensagem: `Pedido ${req.body.numeroPedido} recebido!`
        });
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao salvar pedido!"
        });
    }
}

module.exports = { createOrder };