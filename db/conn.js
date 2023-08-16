const mongoose = require("mongoose")

const password = "jmFHGG9Y6EPFp7ah";

const connectDB = (uri) => {
    console.log("Database Connected")
    return mongoose.connect(uri, {
        useNewUrlParser: true
        // useInifieldTopology: true
    });
}

module.exports = connectDB;