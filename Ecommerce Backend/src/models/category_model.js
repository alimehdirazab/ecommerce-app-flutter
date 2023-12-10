const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, default: "" },
    updatedOn: { type: Date },
    createdOn: { type: Date },
});

categorySchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;


    // we delete above feilds from update bcz we don't want to update these feilds in database even accedently 

    this.updatedOn = new Date();
    next();
});

const categoryModel = model('category', categorySchema);

module.exports = categoryModel;