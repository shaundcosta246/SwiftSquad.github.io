require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./db/conn")

const products_routes = require("./routes/products")

app.get("/", (req, res) => {
    res.send("Hello i m live")
})


// middleware to set router 
app.use("/api/products", products_routes)

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(port,() => {
            console.log(`Listining to the port no ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}
start();