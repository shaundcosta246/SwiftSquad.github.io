const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "price must be provided"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        required: [true, "rating must be provided"],
        default: 4.9
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "redmi", "oppo", "google pixcel", "dell", "hp", "lenovo"],
            message: `Value is not supported`
        }
    },
})


module.exports = mongoose.model("Product", productSchema);