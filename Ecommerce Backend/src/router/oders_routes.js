const OrderRoutes = require('express').Router();
const OrderController = require('./../controller/order_controller');

OrderRoutes.get('/:userId', OrderController.fatchOrderForUser);
OrderRoutes.post('/', OrderController.createOrder);
OrderRoutes.put('/updateStatus', OrderController.updateOrderStatus);


module.exports = OrderRoutes;
