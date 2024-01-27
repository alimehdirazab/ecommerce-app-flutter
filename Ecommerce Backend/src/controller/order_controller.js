const OrderModel = require("../models/order_model");

orderController = {


    createOrder: async function (req, res) {
        try {
            const { user, item } = req.body;
            const newOreder = new OrderModel({
                user: user,
                item: item
            });
            await newOreder.save();

            return res.json({ success: true, data: newOreder, message: "Order Created" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fatchOrderForUser: async function (req, res) {
        try {
            const userId = req.params.userId;
            const foundOrders = await OrderModel.find({
                "user.id": userId
            });
            return res.json({ success: true, data: foundOrders });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },


    updateOrderStatus: async function (req, res) {
        try {
            const { orderId, status } = req.body;
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { _id: orderId },
                { status: status },
                { new: true }
            );
            return res.json({ success: true, data: updatedOrder });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },




};

module.exports = orderController;