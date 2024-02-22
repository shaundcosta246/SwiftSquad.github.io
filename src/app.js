const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const path = require("path");
const io = socketio(server);
const bodyParser = require('body-parser');
const cors = require('cors');

// database
require("./db/conn");
const order = require("./models/order");


// api permission 
app.use(cors({
    // origin: "https://www.squadspeaks.com",
    origin: "*",
}));



// Path 
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");


// app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//socket io
io.on("connection", (socket) => {
    socket.on("foodtodisplayforchef", async(data) => {
        try{
            let shortseats  = data.SHORTEATS;
            let mains = data.MAINS;
            let grills = data.GRILLS;
            let food = {
                SHORTEATS: shortseats,
                MAINS: mains,
                GRILLS: grills
            };
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            // added time  
            let addedHours = currentTime.getHours() + 2;
            let addedMinutes = currentTime.getMinutes() + 60;
            if (addedMinutes >= 60) {
                addedMinutes -= 60;
                addedHours++;
            }
        const ti = `${hours}:${minutes}`;
        const ad = `${addedHours}:${addedMinutes}`
            const savedOrder = new order({
                orderTable: data.tableNo,
                food: food,
                price: data.totalPrice,
                startTime: ti,
                endTime: ad
            });
            savedOrder.save();
        }catch(error){
            if (error instanceof MongoServerError && error.code === 11000) {
                console.error(`Duplicate key error: ${error.message}`);
                // Handle the duplicate key error here
            } else {
                console.error(`An error occurred: ${error.message}`);
            }
        }
        io.emit("foodforchef", data);
        io.emit("foodfordosasection", data);
        io.emit("foodforKothusection", data);
    })
    socket.on("addfoodtodisplay", (data) => {
        io.emit("foodforchef", data);
    })
    socket.on("updateOrder", async(data) => {
        try{
            let addGrills = data.GRILLS;
            let addMains = data.MAINS;
            let addShorteats = data.SHORTEATS;
            const updatedOrder = await order.findOneAndUpdate(
                { "orderTable": data.tableNo }, // Assuming tableNo is the identifier for your order
                { 
                    $push: { 
                        "food.SHORTEATS": { $each: addShorteats },
                        "food.MAINS": { $each: addMains },
                        "food.GRILLS": { $each: addGrills }
                    },
                    $inc: { "price": data.totalPrice }
                },
                { new: true }
            );
        }catch(error){
            console.log(error);
        }
    })
    socket.on("deleteOrder", async(data) => {
        try{
            const result = await order.findOneAndDelete({orderTable: data});
        }catch(error){
            console.log(error);
        }
    })
    socket.on("disconnect", () => {})
})






app.get("/", (req, res) => {
    res.status(201).render("table")
})
app.get("/food", (req, res) => {
    res.status(201).render("food");
})
app.get("/chefscreen", (req, res) => {
    res.status(201).render("chefscreen");
})
app.get("/downtable", (req, res) => {
    res.status(201).render("downtable");
})
app.get("/reception", (req, res) => {
    res.status(201).render("reception");
})
app.get("/admin", (req, res) => {
    res.status(201).render("admin");
})
app.get("/dosaKothuSection", (req, res) => {
    res.status(201).render("dosaKothuSection");
})


// api for tables 
app.get("/allTableFood", async(req, res) => {
    try{
        const orderTS = await order.find(req.query);
        res.send(orderTS);
    }catch(error){
        console.log(error + "This is custom error");
    }
})


app.post("/insertfoods", async (req, res) => {
    try {
        let tableNo = req.body.tableNo;
        res.status(201).render("food", {tableInfo:tableNo});;
    }catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/checkfood", async(req, res) => {
    try{
        let tableNo = req.body.tableNo;
        res.status(201).render("billshowfood", {tableInfo: tableNo})
    }catch(error){
        console.log(error)
    }
})



server.listen(port, () => {
    console.log(`Listining to the port no ${port}`);
})