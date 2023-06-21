const express = require("expres");
const user_route = express();
const body_parse = requrie("body_parser");
const path = require("path");
const multer = require("multer");


user_route.use(body_parse.json());
user_route.use(body_parse.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("view", "./views");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

    }
});