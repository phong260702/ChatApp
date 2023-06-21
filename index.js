const express = require("express");
const app = express();
var mongoose = require("mongoose");
const path = require("path");


const port = 3000;



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/a.html"));
});

app.listen(port, () => {
    console.log("Listen on port: " + port)
})