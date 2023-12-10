const { Schema, model } = require('mongoose');


//we create schema model of cart items bcz in items we have multiple properties like product name and quantity 
const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    item: { type: [cartItemSchema], default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date },
});

cartSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

cartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;


    // we delete above feilds from update bcz we don't want to update these feilds in database even accedently 

    this.updatedOn = new Date();
    next();
});

const cartModel = model('cart', cartSchema);

module.exports = cartModel;