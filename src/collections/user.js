const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    img: {
        type: String,
        len: 100
    },
    name: {
        type: String,
        required: true,
        len: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        len: 30
    },
})

const user = new mongoose.model("user", userSchema);
module.exports = user;