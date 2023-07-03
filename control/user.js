const User = require("../model/user");
const bcrypt = require("bcrypt");

// Render Register Screen
const registerLoad = async (req, res) => {
    try {
        console.log(req.logins);
        res.render("register");
    } catch (error) {
        console.log(error.message);
    }
};

// Taking user data and add to server, finish register
const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: "images/" + req.file.filename,
            password: req.body.password,
        });
        await user.save();

        res.render("register", { message: 'Registration Succesful' });

    } catch (error) {
        console.log(error.message);
    }

};

// Render Login
const loadLogin = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error.message);
    }
};

// Render Logout
const loadLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
    }
}
// Render Logout
const login = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const userData = await User.findOne({ email: userEmail });
        if (!userData || !(userPassword === userData.password)) {
            console.log("incorrect");
            res.render("login", { serverMessage: "Email or Password not correct" });
        } else {
            req.session.user = userData;
            res.redirect("/dashboard");
        }
    } catch (error) {
        console.log(error.message);
    }
}
// Render Logout
const loadDashboard = async (req, res) => {
    try {
        res.render("dashboard", { user: req.session.user });
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { registerLoad, register, loadDashboard, loadLogin, loadLogout, login }