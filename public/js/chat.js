const socket = io();

const liveUri = `https://squadspeaks-github-io.onrender.com`;
// const liveUri = `http://localhost:8000`;



let displayuserimage = () => {
    let par = JSON.parse(localStorage.getItem("userInfo"));
    let accountImage = document.getElementById("accountImage");
    accountImage.src = `uploads/${par.filename}`;
}
displayuserimage();


const messageDiv = document.getElementById("m2-messages");

let un = JSON.parse(localStorage.getItem("userInfo"));


let checkForname = (groups, username) => {
    for (let member of groups.members) {
        if (member.name === username) {
            return true;
        }
    }
    return false;
}

let username = un.name;
let roomname = "Hoppers Marylebone FOH";

let MessageDiv = document.getElementById("m2-messages");
let loadMessages = (data) => {
    try{
    MessageDiv.innerHTML = ""; // Clear the message div before loading new messages

    data.forEach((each, index) => {
        let timestamp = each.createdAt;
        const date = new Date(Number(timestamp));
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
        
        const createdElementl = document.createElement("div");
        createdElementl.classList.add("message");

        if (each.messageType === "text") {
            createdElementl.innerHTML = `
                <ul class="messageul">
                    <li class="messageli messagelid">Delete</li>
                    <li class="messageli messagelr">Reply</li>
                </ul>
                <img src="img/downarror.png" alt="" class="messagedownarrow">
                <span class="hiddenID">${each._id}</span>
                <span class="mh">${each.messageSender}</span>
                <p class="messageP">${each.message}</p>
                <span class="messageTime">${formattedTime}</span>
            `;
        }

        if (each.messageType === "file" && each.fileType.startsWith("image/")) {
            createdElementl.innerHTML = `
                <ul class="messageul">
                    <li class="messageli messagelid">Delete</li>
                    <li class="messageli messagelr">Reply</li>
                </ul>
                <img src="img/downarror.png" alt="" class="messagedownarrow">
                <span class="hiddenID">${each._id}</span>
                <span class="mh">${each.messageSender}</span>
                <img src="messagesFile/${each.filename}" class="messageImage">
                <p class="messageP">${each.message}</p>
                <span class="messageTime">${formattedTime}</span>
            `;
        }
        // for non image files lile (word file) 
        if (each.messageType === "file" && each.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            createdElementl.innerHTML = `
                <ul class="messageul">
                    <li class="messageli messagelid">Delete</li>
                    <li class="messageli messagelr">Reply</li>
                </ul>
                <img src="img/downarror.png" alt="" class="messagedownarrow">
                <span class="hiddenID">${each._id}</span>
                <span class="mh">${each.messageSender}</span>
                <a href="messagesFile/${each.filename}" target="_blank" class="fileA">${each.filename}</a>
                <p class="messageP">${each.message}</p>
                <span class="messageTime">${formattedTime}</span>
            `;
        }
        // download="${each.filename}

        // Hide the message sender if the previous message was from the same sender
        if (index > 0 && data[index - 1].messageSender === each.messageSender) {
            let mhElement = createdElementl.querySelector(".mh");
            mhElement.style.display = "none";
            createdElementl.style.marginTop = "-10px";
        }

        // Append the created element to the MessageDiv
        MessageDiv.appendChild(createdElementl);
        messageDiv.scrollTop = messageDiv.scrollHeight;
    });
    }catch(error){
        console.log(error)
    }
}


// Add event listeners to the parent container to handle dropdowns and delete actions
MessageDiv.addEventListener("click", async(e) => {
    if (e.target.classList.contains("messagedownarrow")) {
        const ulElement = e.target.parentElement.querySelector('.messageul');
        const isDisplayed = ulElement.style.display === 'flex';
        document.querySelectorAll('.messageul').forEach(ul => ul.style.display = 'none');
        ulElement.style.display = isDisplayed ? 'none' : 'flex';
    }
    
    if (e.target.classList.contains("messagelid")) {
        let messageId = e.target.parentElement.parentElement.querySelector('.hiddenID').innerText;
        let messageName = e.target.parentElement.parentElement.querySelector(".mh").innerText;
        let messageContainer = e.target.parentElement.parentElement.querySelector('.messageP');
        console.log(messageId, messageContainer, roomname);
        if(username === messageName){
            socket.emit("deletedMessage", {
                messageId, 
                text: "This message was deleted"
            });
            messageContainer.innerText = `This message was deleted`;
        }else{
            let userUrid = `${liveUri}/getGroup?groupname=${roomname}`;
            let datad = await fetch(userUrid);
            let responsed = await datad.json();
            let response = responsed[0];
            response.members.some((each) => {
                if (each.name === username && each.groupPos === "admin") {
                    socket.emit("deletedMessage", {
                        messageId, 
                        text: `This message was deleted by admin ${username}`
                    });
                    messageContainer.innerText = `This message was deleted by admin ${username}`;
                    return true; // Stop the loop
                } else {
                    alert(`Sorry, this message can't be removed. Please contact the admin.`);
                    return true; // Stop the loop after the alert
                }
            });
        }
    }
});



let loadPage = async() => {
    try{
        let group = document.getElementById("group");
        group.innerHTML = ``;
        const userUri = `${liveUri}/getGroup`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((eac) => {
            if(checkForname(eac, username)){
                // console.log("Searching for "+ username)
                let createdElement = document.createElement("div");
                createdElement.classList.add("groups");
                createdElement.innerHTML = `
                    <img src="GroupImages/${eac.profilePic}" alt="">
                    <span>${eac.groupname}</span>
                `;
                group.appendChild(createdElement);
                // console.log("One document created")
            }else{
                // console.log(username+ " not in the group")
            }
        });
        const senderButton = document.getElementsByClassName("groups");
        const senderButtonArray = Array.from(senderButton);
        let unclickeveryelement = () => {
            senderButtonArray.forEach((e) => {
                e.style.background = "transparent"
            })
        }
        senderButtonArray.forEach((eac) => {
            eac.addEventListener("click", async(e) => {
                unclickeveryelement();
                eac.style.background = "white";
                const ParentDiv = e.target.parentElement;
                const firstChild = ParentDiv.children[0];
                const secondChild = ParentDiv.children[1];
                let userUrid = `${liveUri}/getGroup?groupname=${secondChild.innerText}`;
                let datad = await fetch(userUrid);
                let responsed = await datad.json();
                changeGroupNav(firstChild, secondChild, responsed[0].description);
                roomname = secondChild.innerText;
                socket.emit("userloaded", ({name: username, room: roomname}))
                // load messages 
                const userUri = `${liveUri}/getGroupmessages?Groupname=${secondChild.innerText}`;
                let data = await fetch(userUri);
                const response = await data.json();
                // const messageDiv = document.getElementById("m2-messages");
                loadMessages(response);
                messageDiv.scrollTop = messageDiv.scrollHeight;
            })
        });
    }catch(error){
        console.log(error)
    }
}


loadPage();
messageDiv.scrollTop = messageDiv.scrollHeight;

socket.emit("userloaded", ({name: username, room: roomname}));

let groupimaged = document.getElementById("groupimage");
let groupnamed = document.getElementById("groupname");
let groupdescription = document.getElementById("groupdescription");
let changeGroupNav = (groupimage, groupname, description) => {
    try{
        groupimaged.src = groupimage.src;
        groupnamed.innerText = groupname.innerText;
        groupdescription.innerText = description;
    }catch(error){
        console.log(error + "This is error")
    }
}







// send data 
const chatform = document.getElementById("m2-inputDiv");
const messageValue = document.getElementById("messageValue");

messageValue.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        chatform.dispatchEvent(new Event('submit'));
    }
});



chatform.addEventListener("submit", function(e){
    e.preventDefault();
    let messageText = messageValue.value;
    let room = roomname;
    let messageImage = document.getElementById("imageMessage");
    let messageFile = messageImage.files[0];
    // console.log(messageFile)
    if(messageText === "" && !messageFile){
        alert("Please type something or upload a image");
    }
    else{
        if(messageFile) {
            let reader = new FileReader();
            reader.onload = function(event) {
                let fileData = event.target.result; // Base64 string
                socket.emit("message", ({
                    messageText, 
                    room, 
                    usernamesent: username,
                    messageFile: fileData,
                    filename: messageFile.name,
                    fileType: messageFile.type
                }));
            }
            reader.readAsDataURL(messageFile);
            e.target.elements.messageValue.value = "";
            e.target.elements.imageMessage.value = null;
		    e.target.elements.messageValue.focus();
        }else{
            socket.emit("message", ({messageText, room, usernamesent: username}));
            e.target.elements.messageValue.value = "";
		    e.target.elements.messageValue.focus();
        }
    }
})


const appendMessage = (message, username, filename) => {
    let timestamp = Date.now();
    const date = new Date(Number(timestamp));
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

    const createdElement = document.createElement("div");
    createdElement.classList.add("message");
    if(filename){
        createdElement.innerHTML = `
        <span class="mh">${username}</span>
        <img src="messagesFile/${filename}" class="messageImage">
        <p class="messageP">${message}</p>
        <span class="messageTime">${formattedTime}</span>
        `;
    }else{
        createdElement.innerHTML = `
        <span class="mh">${username}</span>
        <p class="messageP">${message}</p>
        <span class="messageTime">${formattedTime}</span>
        `;
    }
    messageDiv.appendChild(createdElement)
}

// receive data 
messageDiv.scrollTop = messageDiv.scrollHeight;
socket.on("receiveMessage", async({messageText, room, usernamesent, filename}) => {
    if(roomname === room){
        appendMessage(messageText, usernamesent, filename)
        messageDiv.scrollTop = messageDiv.scrollHeight;

    }else{
        console.log("This is not our message")
    }
})


let groupInfo = document.getElementById("groupInfo");
let groupUl = document.getElementById("groupUl");
let MembersDiv = document.getElementById("flex-members");
groupInfo.addEventListener("click", () => {
    const Isdisplayed = groupUl.style.display === "flex";
    groupUl.style.display = Isdisplayed ? "none" : "flex"
    MembersDiv.style.display = "none";
})
groupUl.addEventListener("click", async(e) => {
    if(e.target.id === 'groupMember'){
        MembersDiv.innerHTML = "";
        const Isdisplayed = MembersDiv.style.display === "flex";
        MembersDiv.style.display = Isdisplayed ? "none" : "flex";
        groupUl.style.display = "none";
        let userUrid = `${liveUri}/getGroup?groupname=${roomname}`;
        let datad = await fetch(userUrid);
        let responsed = await datad.json();
        let response = responsed[0];

        // Separate members into admins and non-admins
        let admins = response.members.filter(member => member.groupPos === 'admin');
        let nonAdmins = response.members.filter(member => member.groupPos !== 'admin');

         // Combine both arrays with admins first
         let orderedMembers = [...admins, ...nonAdmins];

        orderedMembers.forEach(async(each) => {
            const uuri = `${liveUri}/getallusers?name=${each.name}`;
            let datau = await fetch(uuri);
            const responseu = await datau.json();
            let whopost = responseu[0];
            let createdElement = document.createElement("div");
            createdElement.classList.add("gmembers");
            if(each.groupPos === "admin"){
                createdElement.innerHTML = `
                <img src="uploads/${whopost.filename}" alt="" class="gm-i">
                <div class="flex-n-p">
                    <span class="gm-n">${whopost.name}</span>
                    <span class="gm-p">${whopost.position}</span>
                </div>
                <span class="gm-a">admin</span>
                `;
            }else{
                createdElement.innerHTML = `
                <img src="uploads/${whopost.filename}" alt="" class="gm-i">
                <div class="flex-n-p">
                    <span class="gm-n">${whopost.name}</span>
                    <span class="gm-p">${whopost.position}</span>
                </div>
                `;
            }
            MembersDiv.appendChild(createdElement);
        })
    }
    if(e.target.id === 'exitGroup'){
        console.log("Show exit group")
    }
})