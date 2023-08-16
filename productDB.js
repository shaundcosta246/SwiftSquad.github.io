require("dotenv").config()
const connectDB = require("./db/conn");
const Product = require("./models/products");
const ProductJson = require("./products.json");

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL)
        await Product.create(ProductJson);
    }catch(error){
        console.log(error)
    }
}

start();