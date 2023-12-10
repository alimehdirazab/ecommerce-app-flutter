const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },//in this line in ref i add category bcz in category model i create model with same name as i write here in ref
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date },
});

productSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;


    // we delete above feilds from update bcz we don't want to update these feilds in database even accedently 

    this.updatedOn = new Date();
    next();
});

const productModel = model('product', productSchema);

module.exports = productModel;