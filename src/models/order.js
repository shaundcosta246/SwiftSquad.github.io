const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderTable: {
        type: Number,
        required: true,
        len: 10
    },
    food: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        len: 10
    },
});

const order1 = new mongoose.model("order1", orderSchema);
const order2 = new mongoose.model("order2", orderSchema);
const order3 = new mongoose.model("order3", orderSchema);
const order4 = new mongoose.model("order4", orderSchema);
const order5 = new mongoose.model("order5", orderSchema);
const order6 = new mongoose.model("order6", orderSchema);
const order7 = new mongoose.model("order7", orderSchema);
const order8 = new mongoose.model("order8", orderSchema);
const order9 = new mongoose.model("order9", orderSchema);
const order10 = new mongoose.model("order10", orderSchema);
const order11 = new mongoose.model("order11", orderSchema);
const order12 = new mongoose.model("order12", orderSchema);
const order14 = new mongoose.model("order14", orderSchema);
const order15 = new mongoose.model("order15", orderSchema);
const order16 = new mongoose.model("order16", orderSchema);
const order20 = new mongoose.model("order20", orderSchema);
const order21 = new mongoose.model("order21", orderSchema);
const order22 = new mongoose.model("order22", orderSchema);
const order23 = new mongoose.model("order23", orderSchema);
module.exports = { order1, order2, order3, order4, order5, order6, order7, order8, order9, order10, order11, order12, order14, order15, order16, order20, order21, order22, order23 };