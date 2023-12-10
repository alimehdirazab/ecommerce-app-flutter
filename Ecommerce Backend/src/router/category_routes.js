const categoryRoutes = require('express').Router();
const categoryController = require('./../controller/category_controller');

categoryRoutes.get('/', categoryController.fatchAllCategory);
categoryRoutes.get('/:id', categoryController.fatchCategoryById);
categoryRoutes.post('/', categoryController.createCategory);




module.exports = categoryRoutes;