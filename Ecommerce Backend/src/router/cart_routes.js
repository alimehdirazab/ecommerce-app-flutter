const cartRoutes = require('express').Router();
const cartController = require('./../controller/cart_controller');

cartRoutes.post('/', cartController.addToCart);




module.exports = cartRoutes;