const express = require("express");
const app = express();
var mongoose = require("mongoose");
const path = require("path");
const http = require("http").Server(app);
require("dotenv").config();
const io = require("socket.io")(http);
const User = require("./model/user");
const Chat = require("./model/chat");
const userRoute = require("./route/user");


const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app')

app.use(express.static(__dirname + '/public/public'));
app.use("/", userRoute);

var usp = io.of("/user");

usp.on("connection", async (socket) => {
    console.log("User connect: ", socket.id);
    const userId = socket.handshake.auth.token;
    const groupId = socket.handshake.auth.group;
    await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '1' } });
    socket.broadcast.emit("getOnline", { user_id: userId });
    let chat = await Chat.find({ special: groupId });
    socket.emit("loadMessage", { chats: chat });

    socket.on("disconnect", async () => {
        await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '0' } });
        socket.broadcast.emit("getOffline", { user_id: userId });
        console.log(socket.id + " disconnect");
    })

    socket.on("newChat", (data) => {
        socket.broadcast.emit("loadNewChat", data);
    })

    // socket.on("existChat", async (data) => {
    //     let chat = await Chat.find({
    //         // $or: [
    //         //     { sender_id: data.sender_id, receiver_id: data.receiver_id },
    //         //     { sender_id: data.receiver_id, receiver_id: data.sender_id }
    //         // ]
    //         special: data.special
    //     })
    //     socket.emit("loadChat", { chat: chat });
    // })
})

http.listen(port, () => {
    console.log("Listen on port: " + port);
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + "/a.html"));
// });

// app.listen(port, () => {
//     console.log("Listen on port: " + port)
// })