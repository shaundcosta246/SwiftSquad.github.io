const mongoose = require("mongoose");
const localdatabase = "mongodb://127.0.0.1:27017/Hoppers"
mongoose.connect(localdatabase, {
    useNewUrlParser: true,
})
.then(() => {
    console.log(console.log("database connected"));
}).catch((error) => {
    console.log(error)
})
