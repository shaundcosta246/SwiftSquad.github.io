const mongoose = require("mongoose");

const groupmessageSchema = new mongoose.Schema({
    messageSender: {
        type: String,
        required: true
    },
    Groupname: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    messageType: {
        type: String,
        default: "text"
    },
    filename: {
        type: String
    },
    fileType: {
        type: String
    },
    createdAt: {
        type: String,
        required: true,
    }
})

const groupmessage = new mongoose.model("groupmessage", groupmessageSchema);
module.exports = groupmessage;