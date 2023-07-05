const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // require: true,
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // require: true,
    },
    message: {
        type: String,
        require: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("chat", chatSchema);