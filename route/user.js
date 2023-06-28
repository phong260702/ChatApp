const express = require("express");
const user_route = express();
const body_parse = require("body-parser");
const path = require("path");
const multer = require("multer");
const userController = require("../control/user")


user_route.use(body_parse.json());
user_route.use(body_parse.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("views", "./views");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

user_route.get('/register', userController.registerLoad);
user_route.post('/register', upload.single("image"), userController.register);

module.exports = user_route;