const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerLoad = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error.message);
    }
};


const register = async (req, res) => {
    try {
        const passwordHash = bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: "images/" + req.file.filename,
            password: passwordHash
        });

        await user.save();

        res.render("register", { message: 'Registration Succesful' });

    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { registerLoad, register }