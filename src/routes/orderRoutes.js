const express = require("express")
const router = express.Router()

const orderController = require("../controllers/controller");

router.post("/", orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/list', orderController.listOrders);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id', orderController.updateOrder);

module.exports = router