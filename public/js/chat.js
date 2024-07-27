const socket = io();

let user = {
    name: "Shaun",
    room: "Hoppers Marylebone FOH"
}
// setInterval(() => {
//     console.log(user.room)
// },1000);

socket.emit("userloaded", ({name: user.name, room: user.room}))

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
    eac.addEventListener("click", (e) => {
        unclickeveryelement();
        eac.style.background = "white";
        const ParentDiv = e.target.parentElement;
        const firstChild = ParentDiv.children[0];
        const secondChild = ParentDiv.children[1];
        changeGroupNav(firstChild, secondChild);
        user.room = secondChild.innerText;
        socket.emit("userloaded", ({name: user.name, room: user.room}))
    })
})

// send data 
const chatform = document.getElementById("m2-inputDiv");
const messageValue = document.getElementById("messageValue");
chatform.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = messageValue.value
    let room = user.room
    if(message === ""){
        alert("Please type something");
    }else{
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
socket.on("receiveMessage", (data) => {
    appendMessage(data, "Yeschef")
	messageDiv.scrollTop = messageDiv.scrollHeight;
})