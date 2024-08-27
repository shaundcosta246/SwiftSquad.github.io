const liveUri = `https://squadspeaks-github-io.onrender.com`;
// const liveUri = `http://localhost:8000`;

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

let displayuserimage = () => {
    let par = JSON.parse(localStorage.getItem("userInfo"));
    let accountImage = document.getElementById("accountImage");
    accountImage.src = `uploads/${par.filename}`;
}
displayuserimage();

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
    try{
        parentDiv.innerHTML = ``;
        clickedBtn()
        social.style.background = "#0071e3";
        social.style.color = "white";
        const userUri = `${liveUri}/getallusers`;
        let data = await fetch(userUri);
        const response = await data.json();
        response.forEach((each) => {
            let createdElement =  document.createElement("div");
            createdElement.classList.add("m2-items");
            createdElement.innerHTML = `
                <div class="m2-1">
                    <img src="uploads/${each.filename}" class="personImage" alt="Image">
                    <span class="m2-s1">${each.name}</span>
                    <div class="pf-i">
                        <img src="img/OIP.jpeg" class="flagImage" alt="">
                        <span class="flagInfo">India, Kerala</span>
                    </div>
                </div>
                <div class="m2-2">${each.position}</div>
            `;
            parentDiv.appendChild(createdElement);
        })
    }catch(error){
        console.log(error)
    }
});
notification.addEventListener("click", async(e) => {
    parentDiv.innerHTML = ``;
    clickedBtn()
    notification.style.background = "#0071e3";
    notification.style.color = "white";
});
post.addEventListener("click", async(e) => {
    parentDiv.innerHTML = `<div id="m2-fullscreen">
                <div id="createPost">
                    <form action="/newPost" method="post" enctype="multipart/form-data">
                        <input type="file" name="fileInput" id="" id="fileInput" accept="image/*,video/*">
                        <input type="text" name="user" id="user">
                        <input type="text" placeholder="Description" name="descriptionInput" id="descriptionInput">
                        <button type="Submit">Post</button>
                    </form>
                </div>
                <div id="postlist"></div>
            </div>`;
    clickedBtn()
    post.style.background = "#0071e3";
    post.style.color = "white";
    let user = document.getElementById("user");
    user.value = par.name;
    let postList = document.getElementById("postlist");


    const userUri = `${liveUri}/getallpost`;
    let data = await fetch(userUri);
    const response = await data.json();


    response.forEach(async(each) => {
        const uuri = `${liveUri}/getallusers?name=${each.user}`;
        let datau = await fetch(uuri);
        const responseu = await datau.json();
        let whopost = responseu[0];

        // Create the main container element for each post
        let createElement = document.createElement("div");
        createElement.classList.add("m-2-items-p");

        // Create the media container
        let mediaContainer = document.createElement("div");
        mediaContainer.classList.add("m2-v-d");

        // Check if the file is an image or a video
        const filename = `${each.filename}`;
        let fileExtension = filename.split(".").pop().toLowerCase();
    
        if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
            // Create video element
            let videoElement = document.createElement("video");
            videoElement.src = `posts/${filename}`;
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;
            mediaContainer.appendChild(videoElement);
        } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
            // Create image element
            let imgElement = document.createElement("img");
            imgElement.src = `posts/${filename}`;
            mediaContainer.appendChild(imgElement);
        }else if(filename === ""){
            let nullElement = document.createElement("div");
            nullElement.style.display = "none";
            mediaContainer.appendChild(nullElement);
        }
        else {
            console.log("Media not supported...");
        }

        // Set the inner HTML of the post
        createElement.innerHTML = `
            <div class="m2-i-1">
                <img src="uploads/${whopost.filename}" alt="">
                <div class="fnd">
                    <span class="fpn">${whopost.name}</span>
                    <span class="fpp">${whopost.position}</span>
                </div>
                <span class="m2-time">1hr ago</span>
            </div>
            <div class="m2-i-2">
                <p>${each.description}</p>
                <div class="flex-l-c">
                    <div class="flex-i">
                        <span class="material-symbols-outlined">favorite</span>
                        <span class="f-i-m2">Like</span>
                    </div>
                    <div class="flex-i">
                        <span class="material-symbols-outlined">reply</span>
                        <span class="f-i-m2">Comment</span>
                    </div>
                    <div class="flex-i">
                        <span class="material-symbols-outlined">bookmark</span>
                        <span class="f-i-m2">Save</span>
                    </div>
                </div>
            </div>
        `;

        // Insert the media container into the appropriate place within createElement
        createElement.querySelector('.m2-i-2').insertBefore(mediaContainer, createElement.querySelector('p'));

        // Append the post to the post list
        postList.appendChild(createElement);
    })
});