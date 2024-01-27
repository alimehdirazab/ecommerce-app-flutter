const cartRoutes = require('express').Router();
const cartController = require('./../controller/cart_controller');

cartRoutes.get('/:user', cartController.getCartForUser);
cartRoutes.post('/', cartController.addToCart);
cartRoutes.delete('/', cartController.removeFromCart);

module.exports = cartRoutes;
