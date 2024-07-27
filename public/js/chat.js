const socket = io();
let un = JSON.parse(localStorage.getItem("userInfo"));

let username = un.name;
let roomname = "Hoppers Marylebone FOH";


socket.emit("userloaded", ({name: username, room: roomname}));

let groupimaged = document.getElementById("groupimage");
let groupnamed = document.getElementById("groupname");
let changeGroupNav = (groupimage, groupname) => {
    try{
        groupimaged.src = groupimage.src;
        groupnamed.innerText = groupname.innerText;
    }catch(error){
        console.log(error + "This is error")
    }
}


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
        changeGroupNav(firstChild, secondChild);
        roomname = secondChild.innerText;
        socket.emit("userloaded", ({name: username, room: roomname}))
    })
})

// send data 
const chatform = document.getElementById("m2-inputDiv");
const messageValue = document.getElementById("messageValue");
chatform.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = messageValue.value;
    let room = roomname;
    if(message === ""){
        alert("Please type something");
    }else{
        console.log(`My room is ${room}
            and my message is ${message}`);
        socket.emit("message", ({message, room}));
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
const messageDiv = document.getElementById("m2-messages");
messageDiv.scrollTop = messageDiv.scrollHeight;
socket.on("receiveMessage", ({message, room}) => {
    if(roomname === room){
        appendMessage(message, username)
        messageDiv.scrollTop = messageDiv.scrollHeight;
    }else{
        console.log("This is not our message")
    }
})