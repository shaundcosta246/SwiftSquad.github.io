const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const hbs = require("hbs");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require("cors");
const fs = require("fs");

const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/uploads/")
    },
    filename:(req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage});

// database 
require("./db/conn")
const user = require("./collections/user");
const group = require("./collections/groups");
const groupmessage = require("./collections/groupmessage");
const post = require("./collections/post");

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


io.on("connection", (socket) => {
    socket.on("userloaded", async({name, room}) => {
        socket.join(room);
    });
    socket.on("message", async({messageText, room, usernamesent, messageFile, filename, fileType}) => {
        try{
            if(messageFile){
                // Ensure the file name is safe and within a reasonable length
                const maxFileNameLength = 100;
                let safeFileName = filename.length > maxFileNameLength ? filename.slice(0, maxFileNameLength) : filename;
                safeFileName = safeFileName.replace(/[^a-zA-Z0-9.]/g, '_'); // Replace any invalid characters

                const base64Data = messageFile.split(',')[1];
                // Create a buffer from the base64 data
                const buffer = Buffer.from(base64Data, 'base64');
                const savePath = path.join(__dirname, '../public/messagesFile', safeFileName);
                // Ensure the 'uploads' directory exists, if not, create it
                if (!fs.existsSync(path.join(__dirname, '../public/messagesFile'))) {
                    fs.mkdirSync(path.join(__dirname, '../public/messagesFile'), { recursive: true });
                }
                fs.writeFile(savePath, buffer, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("File saved successfully:", filename);
                    }
                });
                let savedGroupmessage = new groupmessage({
                    messageSender: usernamesent,
                    Groupname: room,
                    message: messageText,
                    messageType: "file",
                    filename: filename,
                    fileType: fileType,
                    createdAt: Date.now()
                })
                await savedGroupmessage.save();
                io.to(room).emit("receiveMessage", ({messageText, room, usernamesent, fileType, filename}));
            }else{
                let savedGroupmessage = new groupmessage({
                    messageSender: usernamesent,
                    Groupname: room,
                    message: messageText,
                    messageType: "text",
                    createdAt: Date.now()
                })
                await savedGroupmessage.save();
                io.to(room).emit("receiveMessage", ({messageText, room, usernamesent, filename}));
            }
        }catch(error){
            console.log(error)
        }
    });
    socket.on("deletedMessage", async(data) => {
        try{
            let groupmessageDelete = await groupmessage.findOneAndUpdate(
                {_id: data.messageId},
                {
                    $set:  {
                        "message": data.text,
                        "filename": "",
                        "fileType": "",
                        "messageType": "text"
                    }
                },
                { new: true }
            )
            if (groupmessageDelete) {
                console.log("Document deleted:");
            } else {
                console.log('No document matches the provided criteria.');
            }
        }catch(error){
            console.log(error)
        }
    })
})


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
app.get("/admin", (req, res) => {
    res.render("admin")
})




// POST 
app.post("/createidentity", upload.single("profilePic"), async(req, res) => {
    try{
        const {name, email, password, position} = req.body;
        const filename = req.file.filename; 
        const filepath = req.file.path; 
        const savedData = new user({
            filename: filename,
            filepath: filepath,
            name: name,
            email: email,
            password: password,
            position: position
        }) 
        await savedData.save();
        res.status(201).render("login")
    }catch(error){
        console.log(error.message)
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
        res.send(error)
    }
})


const storageGroupImage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/GroupImages")
    },
    filename:(req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const storeGroupImage = multer({storage: storageGroupImage});

app.post("/creategroup", storeGroupImage.single("GroupPic"), async(req, res) => {
    try{
        const {groupname, description, admin, members, allInput, admins} = req.body;
        const profilePicname = req.file.filename;
        let arraymember = JSON.parse(members)
        let storeArray = []
        arraymember.forEach((eac) => {
            let object = {
                name: eac,
                groupPos: "none",
            }
            storeArray.push(object)
        });

        let arraymemberAdmin = JSON.parse(admins)
        arraymemberAdmin.forEach((eac) => {
            let object = {
                name: eac,
                groupPos: "admin",
            }
            storeArray.push(object)
        });
        const savedGroupInfo = new group({
            profilePic: profilePicname,
            groupname: groupname,
            description: description,
            members: storeArray,
            createdAt: Date.now()
        });
        await savedGroupInfo.save();
        res.send("sucessfully created group")
    }catch(error){
        res.send("Sorry group could not be created")
    }
})

app.post("/updateGroup", async(req, res) => {
    const {groupname, members} = req.body;
    try{
        let updateGroup = await group.findOneAndUpdate(
            {"groupname": groupname},
            {
                $set: {
                    "members": []
                }
            },
            { new: true }
        );
        updateGroup = await group.findOneAndUpdate(
            {"groupname": groupname},
            {
                $set: {
                    "members": JSON.parse(members)
                }
            },
            { new: true }
        )
        res.send("sucessfully updated group")
    }catch(error){
        res.send(error)
    }
})

const storagePost = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/posts")
    },
    filename:(req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const storePost = multer({storage: storagePost});
app.post("/newPost", storePost.single("fileInput"), async(req, res) => {
    let postvi = req.file ? req.file.filename : null;
    let savedData = new post({
        filename: postvi,
        user: req.body.user,
        description: req.body.descriptionInput,
        likes: "null",
        comments: "null"
    });
    await savedData.save();
    res.send("sucessfully posted")
})








// API 
app.get("/getallusers", async(req, res) => {
    try{
        const data = await user.find(req.query);
        res.status(201).send(data);
    }catch(error){
        res.send("sorry api issue we could not fetch data for u..")
    }
})
app.get("/getGroup", async(req, res) => {
    try{
        const data = await group.find(req.query);
        res.status(201).send(data);
    }catch(error){
        res.send("sorry api issue we could not fetch group data for u..")
    }
})
app.get("/getGroupmessages", async(req, res) => {
    try{
        const data = await groupmessage.find(req.query);
        res.status(201).send(data);
    }catch(error){
        res.send("sorry api issue we could not fetch group message data for u..")
    }
})
app.get("/getallpost", async(req, res) => {
    try{
        const data = await post.find(req.query);
        res.status(201).send(data);
    }catch(error){
        res.send("sorry api issue we could not fetch group message data for u..")
    }
})

server.listen(port, () => {
    console.log(`Listining to the port no ${port}`)
})