const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");
require("dotenv").config()



//database
require("./db/conn");
const Guests = require("./models/guest");
app.use(express.urlencoded({extended:false}))


//templates path
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/login", (req, res) => {
    res.render("loginIn")
})
app.post("/mediaHome", async(req, res) => {
    try{
        const RegisteredGuest = new Guests({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        })
        const savedGuestData = await RegisteredGuest.save();
        res.render("mediaHome");
    }catch(error){
        res.send(error)
    }
})
app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        const userFind = await Guests.findOne({email:email});
        if(userFind.password === password){
            res.status(201).render("mediaHome")
        }else{
            res.send("password does not match")
        }
    }catch(error){
        res.send("sorry please try again")
    }
})



app.listen(port, () => {
    console.log(`Listining to the port no ${port}`);
})
