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

// down stairs 
const order40 = new mongoose.model("order40", orderSchema);
const order41 = new mongoose.model("order41", orderSchema);
const order42 = new mongoose.model("order42", orderSchema);
const order43 = new mongoose.model("order43", orderSchema);
const order44 = new mongoose.model("order44", orderSchema);
const order45 = new mongoose.model("order45", orderSchema);
const order46 = new mongoose.model("order46", orderSchema);
const order47 = new mongoose.model("order47", orderSchema);
const order48 = new mongoose.model("order48", orderSchema);
const order49 = new mongoose.model("order49", orderSchema);
const order100 = new mongoose.model("order100", orderSchema);
const order101 = new mongoose.model("order101", orderSchema);
const order102 = new mongoose.model("order102", orderSchema);
const order103 = new mongoose.model("order103", orderSchema);
module.exports = { order1, order2, order3, order4, order5, order6, order7, order8, order9, order10, order11, order12, order14, order15, order16, order20, order21, order22, order23, order40, order41, order42, order43, order44, order45, order46, order47, order48, order49, order100, order101, order102, order103};