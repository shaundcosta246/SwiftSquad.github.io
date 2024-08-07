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

let MessageDiv = document.getElementById("m2-messages");
let loadMessages = (data) => {
    MessageDiv.innerHTML = "";
    data.forEach((each) => {
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
        createdElementl.innerHTML = `
            <span class="mh">${each.messageSender}</span>
            <p class="messageP">${each.message}</p>
            <span class="messageTime">${formattedTime}</span>
        `;
        MessageDiv.appendChild(createdElementl)
    })
}

let username = un.name;
let roomname = "Hoppers Marylebone FOH";
let loadPage = async() => {
    try{
        let group = document.getElementById("group");
        group.innerHTML = ``;
        const userUri = `${liveUri}/getGroup`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((eac) => {
            if(checkForname(eac, username)){
                console.log("Searching for "+ username)
                let createdElement = document.createElement("div");
                createdElement.classList.add("groups");
                createdElement.innerHTML = `
                    <img src="GroupImages/${eac.profilePic}" alt="">
                    <span>${eac.groupname}</span>
                `;
                group.appendChild(createdElement);
                console.log("One document created")
            }else{
                console.log(username+ " not in the group")
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
                const messageDiv = document.getElementById("m2-messages");
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

chatform.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = messageValue.value;
    let room = roomname;
    if(message === ""){
        alert("Please type something");
    }else{
        socket.emit("message", ({message, room, usernamesent: username}));
        e.target.elements.messageValue.value = "";
		e.target.elements.messageValue.focus();
    }
})


const appendMessage = (message, username) => {
    const createdElement = document.createElement("div");
    createdElement.classList.add("message");
    createdElement.innerHTML = `
        <span class="mh">${username}</span>
        <p>${message}</p>
    `;
    messageDiv.appendChild(createdElement)
}

// receive data 
messageDiv.scrollTop = messageDiv.scrollHeight;
socket.on("receiveMessage", ({message, room, usernamesent}) => {
    if(roomname === room){
        appendMessage(message, usernamesent)
        messageDiv.scrollTop = messageDiv.scrollHeight;
    }else{
        console.log("This is not our message")
    }
})

