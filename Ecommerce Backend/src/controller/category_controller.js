const json = require("body-parser/lib/types/json");
const categoryModel = require("../models/category_model");

categoryController = {
    createCategory: async function (req, res) {
        try {
            const categoryData = req.body;
            const newCategory = new categoryModel(categoryData);
            await newCategory.save();

            return res.json({ success: true, data: newCategory, message: "Category Added Succesfully" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }

    },
    fatchAllCategory: async function (req, res) {
        try {

            const Categories = await categoryModel.find();


            return res.json({ success: true, data: Categories, message: "All Categories Fatched Succesfully" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }

    },
    fatchCategoryById: async function (req, res) {
        try {
            const id = req.params.id;
            const Categories = await categoryModel.findById(id);

            if (!Categories) {
                return json({ success: false, message: "category not found" });
            }

            return res.json({ success: true, data: Categories, message: "All Categories Fatched Succesfully" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }

    }
};

module.exports = categoryController;

