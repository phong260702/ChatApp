const express = require("express");
const user_route = express();
const body_parse = require("body-parser");
const path = require("path");
const multer = require("multer");
const userController = require("../control/user")
const session = require("express-session");
const user = require("../model/user");
const auth = require("../middlewares/auth")
require("dotenv").config();


user_route.use(session({ secret: process.env.SECTION_SECRET }))
user_route.use(body_parse.json());
user_route.use(body_parse.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("views", "./views");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/public/images"));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

// Register route for user
user_route.get('/register', auth.isLogout, userController.registerLoad);
user_route.post('/register', upload.single("image"), userController.register);

// Login route for user
user_route.get("/", auth.isLogout, userController.loadLogin);
user_route.post("/", userController.login);
user_route.get("/dashboard", auth.isLogin, userController.loadDashboard);

// User logout
user_route.get("/logout", auth.isLogin, userController.loadLogout);

user_route.get("*", () => {
    res.redirect("/");
})

module.exports = user_route;