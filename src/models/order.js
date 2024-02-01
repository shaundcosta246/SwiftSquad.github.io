const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderTable: {
        type: Number,
        unique: true,
        required: true,
        len: 10
    },
    food: {
        type: Object,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        len: 10
    },
});

const order = new mongoose.model("order", orderSchema);
module.exports = order;