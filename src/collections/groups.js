const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    groupPos: {
        type: String,
        required: true
    }
})

// const adminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     groupPos: {
//         type: String,
//         required: true,
//         default: "admin"
//     }
// })

const groupSchema = new mongoose.Schema({
    profilePic: {
        type: String,
    },
    groupname: {
        type: String,
        required: true,
        len: 30,
        unique: true
    },
    description: {
        type: String,
        required: true,
        len: 100
    },
    members: [membersSchema],
    createdAt: {
        type: String
    }
});


const group = new mongoose.model("group", groupSchema);
module.exports = group;