const User = require("../model/user");
const bcrypt = require("bcrypt");
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const Chat = require('../model/chat')

// Render Register Screen
const registerLoad = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error.message);
    }
};

// Taking user data and add to server, finish register
const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            res.render("register", { message: 'Email exists' });
            const imagePath = "public/images/" + req.file.filename;
            await unlinkAsync(imagePath);
            return;
        }
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
        var users = await User.find({ _id: { $nin: [req.session.user._id] } })
        res.render("dashboard", { user: req.session.user, users: users });
    } catch (error) {
        console.log(error.message);
    }
}

const saveChat = async (req, res) => {
    try {
        let chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            message: req.body.message,
        });
        const newChat = await chat.save();
        res.status(200).send({ success: true, msg: "Chat Inserted", data: newChat })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

module.exports = { registerLoad, register, loadDashboard, loadLogin, loadLogout, login, saveChat }