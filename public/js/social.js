// User Info 
let img = document.getElementById("img");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let position = document.getElementById("position");

let userInfo = {
    img: img.innerText,
    name: name.innerText,
    email: email.innerText,
    password: password.innerText,
    position: position.innerText,
}

localStorage.setItem("userInfo", JSON.stringify(userInfo))
const par = JSON.parse(localStorage.getItem("userInfo"));
console.log(par);