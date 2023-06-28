const express = require("express");
const app = express();
var mongoose = require("mongoose");
const path = require("path");
const http = require("http").Server(app);
require("dotenv").config();

const userRoute = require("./route/user");


const port = 3000;

// mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app')

app.use("/", userRoute);



http.listen(port, () => {
    console.log("Listen on port: " + port);
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + "/a.html"));
// });

// app.listen(port, () => {
//     console.log("Listen on port: " + port)
// })