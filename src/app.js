const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const path = require("path");
const io = socketio(server);

// database
require("./db/conn");


// Path 
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicPath));


//socket io
io.on("connection", (socket) => {
    console.log("User conected")
    socket.on("disconnect", () => {})
})






app.get("/", (req, res) => {
    res.render("food")
})
app.get("/food", (req, res) => {
    res.render("food")
})



server.listen(port, () => {
    console.log(`Listining to the port no ${port}`);
})