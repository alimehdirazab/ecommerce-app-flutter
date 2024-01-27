const cartModel = require("../models/cart_model");

cartController = {


    getCartForUser: async function (req, res) {
        try {
            const user = req.params.user;
            const foundCart = await cartModel.findOne({ user: user });

            if (!foundCart) {
                return res.json({ success: true, data: [], message: "Cart not found for the user" });
            }

            return res.json({ success: true, data: foundCart.item, message: "Successfully Fetch Data" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },


    addToCart: async function (req, res) {
        try {
            console.log("before ");
            const { product, user, quantity } = req.body;
            const foundCart = await cartModel.findOne({ user: user });
            console.log("after ");

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

            const updatedCart = await cartModel.findOneAndUpdate(
                { user: user },
                { $push: { item: { product: product, quantity: quantity } } },
                { new: true }
            );


            return res.json({ success: true, data: updatedCart, message: "Product Added To Cart" });


        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },
    removeFromCart: async function (req, res) {
        try {
            const { user, product } = req.body;
            const updatedCart = await cartModel.findOneAndUpdate(
                { user: user },
                { $pull: { item: { product: product } } },
                { new: true }
            );

            return res.json({ success: true, data: updatedCart, massage: "Product remove from cart" });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }

    }
};

module.exports = cartController;