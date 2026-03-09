const express = require("express") //importação do express
const router = express.Router() //definição do router do express
const orderController = require("../controllers/controller"); //importa os controles que vao tratar as requisições

router.post("/", orderController.createOrder); //Definição da rota post, por definição no app.js já tem o prefixo /order, então aqui fica: POST /order
router.get('/list', orderController.listOrders); //Definição da rota GET pra listagem de pedidos "/order/list"
router.get('/:id', orderController.getOrderById);//Definição da rota GET para listar os items do pedido conforme orderId.
router.delete('/:id', orderController.deleteOrder); //Definição da rota DELETE passando o id como parametro.
router.put('/:id', orderController.updateOrder); //Definição da rota PUT para atualizar os pedidos conforme o id

module.exports = router; 