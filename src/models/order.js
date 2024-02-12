const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true
    },
    foodprice: {
        type: Number,
        required: true
    }
});


const orderSchema = new mongoose.Schema({
    orderTable: {
        type: Number,
        unique: true,
        required: true,
        len: 10
    },
    food: {
        SHORTEATS: [foodSchema], // Define a nested schema for SHORTEATS
        MAINS: [foodSchema], // Define a nested schema for MAINS
        GRILLS: [foodSchema] // Define a nested schema for GRILLS
    },
    price: {
        type: Number,
        required: true,
        len: 10
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    }
});

const order = new mongoose.model("order", orderSchema);
module.exports = order;