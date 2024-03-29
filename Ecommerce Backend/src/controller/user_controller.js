const userModel = require('./../models/user_model');
const bcrypt = require('bcrypt');
userController = {
    createAccount: async function (req, res) {
        try {
            const userData = req.body;
            const newUser = new userModel(userData);
            await newUser.save();
            console.log("dsdsd");
            return res.json({ success: true, data: newUser, message: "User Created Succesfully" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    signIn: async function (req, res) {
        try {
            const { email, password } = req.body;
            const foundUser = await userModel.findOne({ email: email });
            if (!foundUser) {
                return res.json({ success: false, message: "User Not Found" });
            }
            const passwordMatch = bcrypt.compareSync(password, foundUser.password);
            if (!passwordMatch) {
                return res.json({ success: false, message: "Password is Incorrect" });
            }
            return res.json({ success: true, data: foundUser });

        } catch (ex) {
            return json({ success: false, message: ex });
        }
    }
};

module.exports = userController;