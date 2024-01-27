const { Schema, model } = require('mongoose');


//we create schema model of cart items bcz in items we have multiple properties like product name and quantity 
const orderItemSchema = new Schema({
    product: { type: Map, required: true },
    quantity: { type: Number, default: 1 }
});

const orderSchema = new Schema({
    user: { type: Map, required: true },
    item: { type: [orderItemSchema], default: [] },
    status: { type: String, default: "order-placed" },
    updatedOn: { type: Date },
    createdOn: { type: Date },
});

orderSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

orderSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;


    // we delete above feilds from update bcz we don't want to update these feilds in database even accedently 

    this.updatedOn = new Date();
    next();
});

const OrderModel = model('Order', orderSchema);

module.exports = OrderModel;