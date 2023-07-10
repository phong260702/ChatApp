const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // require: true,
    },
    sender_name: {
        type: String,
        ref: "User"
    },
    // receiver_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     // require: true,
    // },
    special: {
        type: String,
        ref: "User",
    },
    message: {
        type: String,
        require: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("chat", chatSchema);