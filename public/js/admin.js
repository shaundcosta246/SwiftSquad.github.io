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




// update form 
let updatemembers = [
    // {name: "Jude", groupPos: "admin"}, 
    // {name: "Jeet", groupPos: "admin"}, 
    // {name: "Majid", groupPos: "none"}, 
    // {name: "Swati", groupPos: "none"}
];

let updateChangeMember = () => {
    choosenAdmin.innerHTML = "";
    choosenmember.innerHTML = "";
    updatemembers.forEach(async(each) => {
        let createdElement = document.createElement("li");
        createdElement.classList.add("updateadmin");
        createdElement.innerText = each.name;
        if(each.groupPos === "admin"){
            choosenAdmin.appendChild(createdElement)
        }else{
            choosenmember.appendChild(createdElement)
        }
    })
    let putandremobemember = document.getElementsByClassName("updateadmin");
    let arraytormemeber = Array.from(putandremobemember)
    arraytormemeber.forEach((each) => {
        each.addEventListener("click", (e) => {
            let clikedIem = e.currentTarget.innerText;
            updatemembers = updatemembers.filter((each) => each.name !== clikedIem);
            console.log("one item removed");
            console.log(updatemembers);
        });
    });
};


let groupInput = document.getElementById("updatelistgroup");
let searchgrouparrow = document.getElementById("updatesearch");
let searchGrouplist = document.getElementById("searchGrouplist");
let gtogle = 1
searchgrouparrow.addEventListener("click", async() => {
    if(gtogle === 1){
        searchGrouplist.innerHTML = ""
        searchGrouplist.style.display = "flex";
        searchgrouparrow.innerText = "arrow_drop_down";
        const userUri = `${liveUri}/getGroup`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement = document.createElement("div");
            createdElement.innerText = each.groupname;
            createdElement.classList.add("updategrouplists");
            searchGrouplist.appendChild(createdElement);
            createdElement.addEventListener("click", async(e) => {
                let groupname = e.currentTarget.innerText;
                groupInput.value = groupname;
                const getgroup = `${liveUri}/getGroup?groupname=${groupname}`;
                let gdata = await fetch(getgroup);
                const groupresponse = await gdata.json();
                let groupmemebers = groupresponse[0].members;
                updatemembers = groupmemebers;
                updateChangeMember();
            })
        });
        gtogle++;
    }else{
        gtogle--;
        searchgrouparrow.innerText = "arrow_drop_up";
        searchGrouplist.innerHTML = ""
        searchGrouplist.style.display = "none";
    }
})




const choosenAdmin = document.getElementById("updatememberadminlistul");
const choosenmember = document.getElementById("updatenormemberlistul");



let chooseadminlistul = document.getElementById("chooseadminlistul");
let updatedownarrowadmin = document.getElementById("updatedownarrowadmin");
let utogle = 1
updatedownarrowadmin.addEventListener("click", async() => {
    if(utogle === 1){
        chooseadminlistul.innerHTML = "";
        updatedownarrowadmin.innerText = "arrow_drop_down";
        chooseadminlistul.style.display = "flex";
        const userUri = `${liveUri}/getallusers`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement = document.createElement("div");
            createdElement.innerText = each.name;
            createdElement.classList.add("peoplelistli")
            chooseadminlistul.appendChild(createdElement)
            createdElement.addEventListener("click", (e) => {
                let name = e.target.innerText;
                let object = {
                    name: name,
                    groupPos: "admin"
                }
                updatemembers.push(object);
                updateChangeMember();
            })
        });
        utogle++;
    }else{
        chooseadminlistul.style.display = "none";
        updatedownarrowadmin.innerText = "arrow_drop_up";
        utogle--;
    }
})

let choosememberlistul = document.getElementById("choosememberlistul");
let updatedownarrowmember = document.getElementById("updatedownarrowmember")
let mtogle = 1
updatedownarrowmember.addEventListener("click", async() => {
    if(mtogle === 1){
        mtogle++;
        updatedownarrowmember.innerText = "arrow_drop_down";
        choosememberlistul.innerHTML = "";
        choosememberlistul.style.display = "flex";
        const userUri = `${liveUri}/getallusers`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement = document.createElement("div");
            createdElement.innerText = each.name;
            createdElement.classList.add("peoplelistli")
            choosememberlistul.appendChild(createdElement)
            createdElement.addEventListener("click", (e) => {
                let name = e.target.innerText;
                let object = {
                    name: name,
                    groupPos: "none"
                }
                updatemembers.push(object);
                updateChangeMember();
            })
        });
    }else{
        mtogle--;
        updatedownarrowmember.innerText = "arrow_drop_up";
        choosememberlistul.innerHTML = "";
        choosememberlistul.style.display = "none";
    }
});


let updatememberInput = document.getElementById("updatememberInput");
let updateForm = document.getElementById("updateform");
updateForm.addEventListener("submit", function(e){
    e.preventDefault();
    updatememberInput.value = JSON.stringify(updatemembers);
    this.submit();
})