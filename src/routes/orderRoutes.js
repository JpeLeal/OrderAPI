const express = require("express") //importação do express
const router = express.Router() //definição do router do express
const orderController = require("../controllers/controller"); //importa os controles que vao tratar as requisições

router.post("/", (req, res, next) => { //Definição da rota post, por definição no app.js já tem o prefixo /order, então aqui fica: POST /order
    /*
      #swagger.tags = ['Orders']
      #swagger.summary = 'Cria um novo pedido'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              numeroPedido: 123,
              valorTotal: 100,
              dataCriacao: "2026-03-09T12:00:00.000Z",
              items: [
                {
                  idItem: 1,
                  quantidadeItem: 2,
                  valorItem: 50
                }
              ]
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Pedido criado com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Inconsistência de valores'
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    next(); //todo esse body serve de exemplo para o que o swagger deve aceitar quando for fazer o teste pela UI
}, orderController.createOrder); 

router.get("/list", (req, res, next) => {//Definição da rota GET pra listagem de pedidos "/order/list"
    /*
      #swagger.tags = ['Orders']
      #swagger.summary = 'Lista todos os pedidos'
      #swagger.responses[200] = {
        description: 'Lista de pedidos retornada com sucesso'
      }
      #swagger.responses[500] = {
        description: 'Erro ao listar pedidos'
      }
    */
    next(); //o list apenas lista os pedidos sem ter que passar parametro, logo nao precisa de um body gigantesco. apenas com o padrao de resposta
}, orderController.listOrders); 

router.get("/:id", (req, res, next) => {//Definição da rota GET para listar os items do pedido conforme orderId
    /*
      #swagger.tags = ['Orders']
      #swagger.summary = 'Busca um pedido por ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pedido',
        required: true,
        schema: {
          type: 'string'
        }
      }
      #swagger.responses[200] = {
        description: 'Pedido encontrado com sucesso'
      }
      #swagger.responses[404] = {
        description: 'Pedido não encontrado'
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    next(); //todo esse body serve de exemplo para o que o swagger deve aceitar quando for fazer o teste pela UI
}, orderController.getOrderById);

router.put("/:id", (req, res, next) => {//Definição da rota PUT para atualizar os pedidos conforme o id
    /*
      #swagger.tags = ['Orders']
      #swagger.summary = 'Atualiza um pedido existente'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pedido',
        required: true,
        schema: {
          type: 'string'
        }
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              valorTotal: 120,
              dataCriacao: "2026-03-09T12:00:00.000Z",
              items: [
                {
                  idItem: 10,
                  quantidadeItem: 3,
                  valorItem: 40
                }
              ]
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Pedido atualizado com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Inconsistência de valores'
      }
      #swagger.responses[404] = {
        description: 'Pedido não encontrado'
      }
      #swagger.responses[500] = {
        description: 'Erro ao tentar atualizar pedido'
      }
    */
    next(); //todo esse body serve de exemplo para o que o swagger deve aceitar quando for fazer o teste pela UI
}, orderController.updateOrder); 

router.delete("/:id", (req, res, next) => {//Definição da rota DELETE passando o id como parametro.
    /*
      #swagger.tags = ['Orders']
      #swagger.summary = 'Remove um pedido por ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pedido',
        required: true,
        schema: {
          type: 'string'
        }
      }
      #swagger.responses[200] = {
        description: 'Pedido deletado com sucesso'
      }
      #swagger.responses[404] = {
        description: 'Pedido inexistente'
      }
      #swagger.responses[500] = {
        description: 'Erro ao tentar deletar pedido'
      }
    */
    next(); //todo esse body serve de exemplo para o que o swagger deve aceitar quando for fazer o teste pela UI

}, orderController.deleteOrder); 

module.exports = router; 