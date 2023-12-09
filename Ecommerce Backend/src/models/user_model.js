const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userSchema = new Schema({
    id: { type: String, unique: true },
    fullName: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    profileProgress: { type: Number, default: 0 },//we assume that 0 means new account created,1 means old user 
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

userSchema.pre('save', function (next) {
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    // hash the password
    const salt = bcrypt.genSaltSync(10);// genrate salt to hash the password
    const hashedPassword = bcrypt.hashSync(this.password, salt); //hashed password genrated 
    this.password = hashedPassword; //now we store new hashed password

    next(); // next save the pre code in schema 
});

userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    // we delete above feilds from update bcz we don't want to update these feilds in database even accedently 

    this.updatedOn = new Date();
    next();
});

const userModel = new model('User', userSchema);

module.exports = userModel;