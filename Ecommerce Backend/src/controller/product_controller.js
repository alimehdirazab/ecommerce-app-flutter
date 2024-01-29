const json = require("body-parser/lib/types/json");
const productModel = require("../models/product_model");

productController = {
    createProduct: async function (req, res) {
        try {
            const productData = req.body;
            const newProduct = new productModel(productData);
            await newProduct.save();

            return res.json({ success: true, data: newProduct, message: "Product Added Succesfully" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },
    fatchAllProduct: async function (req, res) {
        try {
            const products = await productModel.find();

            return res.json({ success: true, data: products, message: "Products Fatched Succesfully" });
        } catch (ex) {
            return json({ success: false, message: ex });
        }
    },
    fatchProductByCategory: async function (req, res) {
        try {
            const categoryId = req.params.id;
            const products = await productModel.find({ category: categoryId });

            return res.json({ success: true, data: products, message: "Products Fatched Succesfully" });
        } catch (ex) {
            return json({ success: false, message: ex });
        }
    }
}


module.exports = productController;