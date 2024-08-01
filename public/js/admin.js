const liveUri = `https://squadspeaks-github-io.onrender.com`;
// const liveUri = `http://localhost:8000`;

let createGroupForm = document.getElementById("createGroupForm");


let membersPar = document.getElementById("members-par");
let membersInput = document.getElementById("members");
let adminInputs = document.getElementById("admins")
let addedMember = [];
let addedMemberShow = () => {
    membersPar.innerHTML = ``
    addedMember.forEach((each) => {
        let createdSpan = document.createElement("span");
        createdSpan.classList.add("memberspan");
        createdSpan.innerText = each; 
        membersPar.appendChild(createdSpan);  
    })
}

let ud = 1;
let downarrowmember = document.getElementById("downarrow");
let peoplelist = document.getElementById("peoplelist");
let allInput = document.getElementById("allInput");
downarrowmember.addEventListener("click", async() => {
    if(ud === 1){
        downarrow.innerText = "arrow_drop_down";
        ud++;
        peoplelist.style.display = "flex";
        const userUri = `${liveUri}/getallusers`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement = document.createElement("div");
            createdElement.innerText = each.name;
            createdElement.classList.add("peoplelistli")
            peoplelist.appendChild(createdElement)
            createdElement.addEventListener("click", (e) => {
                allInput.value = "";
                let clickedElement = e.target.innerText;
                addedMember.push(clickedElement);
                addedMemberShow();
            })
        });
    }else{
        downarrow.innerText = "arrow_drop_up";
        ud--;
        peoplelist.style.display = "none";
        peoplelist.innerHTML = ``;
    }
})

let adminsPar = document.getElementById("admins-par");
let addedMemberAdmin = [];
let addedMemberadminShow = () => {
    adminsPar.innerHTML = ``
    addedMemberAdmin.forEach((each) => {
        let createdSpan = document.createElement("span");
        createdSpan.classList.add("memberspan");
        createdSpan.innerText = each; 
        adminsPar.appendChild(createdSpan);  
    })
}

let aud = 1
let downarrowadmin = document.getElementById("downarrowadmin");
let peoplelistadmin = document.getElementById("adminlist");
let allInputadmin = document.getElementById("allInputadmin");
downarrowadmin.addEventListener("click", async() => {
    if(aud === 1){
        downarrowadmin.innerText = "arrow_drop_down";
        aud++;
        peoplelistadmin.style.display = "flex";
        const userUri = `${liveUri}/getallusers`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement = document.createElement("div");
            createdElement.innerText = each.name;
            createdElement.classList.add("peoplelistli")
            peoplelistadmin.appendChild(createdElement)
            createdElement.addEventListener("click", (e) => {
                allInputadmin.value = "";
                let clickedElement = e.target.innerText;
                addedMemberAdmin.push(clickedElement);
                addedMemberadminShow();
            })
        });
    }else{
        downarrowadmin.innerText = "arrow_drop_up";
        aud--;
        peoplelistadmin.style.display = "none";
        peoplelistadmin.innerHTML = ``;
    }
})

createGroupForm.addEventListener("submit", function(event){
    event.preventDefault();
    membersInput.value = JSON.stringify(addedMember);
    adminInputs.value = JSON.stringify(addedMemberAdmin);
    this.submit();
})