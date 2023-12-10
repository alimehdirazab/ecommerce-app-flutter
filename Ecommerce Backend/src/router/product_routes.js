const productRoutes = require('express').Router();
const productController = require('./../controller/product_controller');

productRoutes.get('/', productController.fatchAllProduct);
productRoutes.get('/category/:id', productController.fatchProductByCategory);
productRoutes.post('/', productController.createProduct);




module.exports = productRoutes;