const mongoose = require("mongoose");
const uri = "mongodb+srv://shaundcosta246:jmFHGG9Y6EPFp7ah@cluster0.vpeqywk.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true
})
.then(() => {
    console.log("database connected...")
}).catch((error) => {
    console.log(error);
})