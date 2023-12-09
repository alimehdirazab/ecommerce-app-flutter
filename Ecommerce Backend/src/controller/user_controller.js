const userModel = require('./../models/user_model');
const bcrypt = require('bcrypt');
userController = {
    createAccount: async function (req, res) {
        try {
            const userData = req.body;
            const newUser = new userModel(userData);
            await newUser.save();

            return res.json({ succes: true, data: newUser, message: "User Created Succesfully" });
        } catch (ex) {
            return res.json({ succes: false, message: ex });
        }
    },

    signIn: async function (req, res) {
        try {
            const { email, password } = req.body;
            const foundUser = await userModel.findOne({ email: email });
            if (!foundUser) {
                return res.json({ succes: false, message: "User Not Found" });
            }
            const passwordMatch = bcrypt.compareSync(password, foundUser.password);
            if (!passwordMatch) {
                return res.json({ succes: false, message: "Password is Incorrect" });
            }
            return res.json({ succes: true, data: foundUser });

        } catch (ex) {
            return json({ succes: true, message: ex });
        }
    }
};

module.exports = userController;