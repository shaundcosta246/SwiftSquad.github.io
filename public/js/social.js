const liveUri = `https://squadspeaks-github-io.onrender.com`;
const localUri = `http://localhost:8000`;

// User Info 
let filename = document.getElementById("filename");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let position = document.getElementById("position");

let userInfo = {
    filename: filename.innerText,
    name: name.innerText,
    email: email.innerText,
    password: password.innerText,
    position: position.innerText,
}
if(userInfo.name === ""){
    console.log("No user founded old user continue...")
}else{
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
}
const par = JSON.parse(localStorage.getItem("userInfo"));

let parentDiv = document.getElementById("m-2")
let notification = document.getElementById("notification")
let social = document.getElementById("soc")
let post = document.getElementById("post")

let nbtns = document.getElementsByClassName("nbtns");
let arrayofnavbtn = Array.from(nbtns);

let clickedBtn = () => {
    arrayofnavbtn.forEach((e) => {
        e.style.background = "#e4e4e4"
        e.style.color = "black";
    })
}

social.addEventListener("click", async(e) => {
    parentDiv.innerHTML = ``;
    clickedBtn()
    social.style.background = "#0071e3";
    social.style.color = "white";
    const userUri = `${liveUri}/getallusers`;
    let data = await fetch(userUri);
    const response = await data.json();
    response.forEach((each) => {
        let createdElement =  document.createElement("div");
        createdElement.classList.add("m-2-items");
        createdElement.innerHTML = `
            <div class="m2-1">
                <img src="uploads/${each.filename}" alt="">
            </div>
            <div class="m2-2">
                <span class="m2-s-1">${each.name}</span>
                <span class="m2-s-2">${each.position}</span>
                <span class="m2-s-3">Active</span>
            </div>
        `;
        parentDiv.appendChild(createdElement);
    })
});
notification.addEventListener("click", async(e) => {
    parentDiv.innerHTML = ``;
    clickedBtn()
    notification.style.background = "#0071e3";
    notification.style.color = "white";
});
post.addEventListener("click", async(e) => {
    parentDiv.innerHTML = ``;
    clickedBtn()
    post.style.background = "#0071e3";
    post.style.color = "white";
});