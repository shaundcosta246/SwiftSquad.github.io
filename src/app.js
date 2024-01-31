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
const {order1, order2, order3, order4, order5, order6, order7, order8, order9, order10, order11, order12, order14, order15, order16, order20, order21, order22, order23, order40, order41, order42, order43, order44, order45, order46, order47, order48, order49, order100, order101, order102, order103} = require("./models/order");


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
            let shortseats  = data.SHORTEATS
            let stringShortEats = JSON.stringify(shortseats);
            let mains = data.MAINS
            let stringMains = JSON.stringify(mains);
            let grills = data.GRILLS
            let stringGrills = JSON.stringify(grills);
            let food = {
                SHORTEATS: stringShortEats,
                MAINS: stringMains,
                GRILLS: stringGrills
            };
            let stringfyFood = JSON.stringify(food);
            const tableNo = data.tableNo
            const wtp = `order${tableNo}`;
            if(eval(wtp)){
                const order = eval(wtp);
                const savedOrder = new order({
                    orderTable: tableNo,
                    food: stringfyFood,
                    price: data.totalPrice
                });
                await savedOrder.save();
                console.log("New order saved")
            }else{
                console.log("Sorry could not insert the data of this order")
            }
        }catch(error){
            console.log(error)
        }
        io.emit("foodforchef", data)
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


// api for tables 
app.get("/allTableFood:id", async(req, res) => {
    try{
        const tableNoTF = req.params.id
        const order = await order1.find(req.query);
        // res.send(order);
        const wtp = `order${tableNoTF}`;
        if(eval(wtp)){
            const order = eval(wtp);
            const findData = await order.find({});
            res.send(findData);
        }else{
            console.log("Sorry wrong input")
        }
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





server.listen(port, () => {
    console.log(`Listining to the port no ${port}`);
})