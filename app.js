const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log("Running on port: " + PORT);
});


const io = require("socket.io")(server)

app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) => {
    console.log(socket.id);
})