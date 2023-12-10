const cartModel = require("../models/cart_model");

cartController = {

    addToCart: async function (req, res) {
        try {
            const { product, user, quantity } = req.body;
            const foundCart = await cartModel.findOne({ user: user });

            //if cart does not exist 
            if (!foundCart) {
                const newCart = new cartModel({ user: user });
                newCart.item.push({
                    product: product,
                    quantity: quantity,
                });
                await newCart.save();
                return res.json({ success: true, data: newCart, message: "Product Added To Cart" });
            }

            //if cart already exists for this user 

            const updatedCart = await cartModel.findByIdAndUpdate(
                { user: user },
                { $push: { item: { product: product, quantity, quantity } } },
                { new: true }
            );

            return res.json({ success: true, data: updatedCart, message: "Product Added To Cart" });


        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },
    removeFromCart: async function (req, res) {

    }
};

module.exports = cartController;