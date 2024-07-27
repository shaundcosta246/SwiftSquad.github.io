const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const hbs = require("hbs");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
// const exphbs = require("express-handlebars");

// database 
require("./db/conn")
const user = require("./collections/user")

// path 
const staticPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")
const viewsPath = path.join(__dirname, "../templates/views")



// Set 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// api related 
app.use(cors({
    origin: "*"
}));




app.get("/", (req, res) => {
    res.render("login")
})
app.get("/social", (req, res) => {
    res.render("social")
})
app.get("/chat", (req, res) => {
    res.render("chat")
})
app.get("/week", (req, res) => {
    res.render("week")
})
app.get("/sign", (req, res) => {
    res.render("sign")
})


io.on("connection", (socket) => {
    socket.on("userloaded", async({name, room}) => {
        socket.join(room);
    });
    socket.on("message", async({message, room}) => {
        console.log("Message is from "+ room +" " +message)
        io.to(room).emit("receiveMessage", message)
    });
})


// POST 
app.post("/createidentity", async(req, res) => {
    try{
        const img = `img/${req.body.name}`
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const position = req.body.position;
        const savedData = new user({
            img: img,
            name: name,
            email: email,
            password: password,
            position: position
        }) 
        await savedData.save();
        res.status(201).render("login")
    }catch(error){
        console.log(error)
    }
})
app.post("/getidentity", async(req, res) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        const finduser = await user.findOne({email:email});
        if(finduser.password === password){
            res.status(201).render("social", {infoObject: finduser});
        }else{
            res.send("Sorry password not matching")
        }
    }catch(error){
        console.log(error)
    }
})





server.listen(port, () => {
    console.log(`Listining to the port no ${port}`)
})