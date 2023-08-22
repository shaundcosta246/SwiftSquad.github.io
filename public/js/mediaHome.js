const Instagram = [
    {
    backgroundImage: "https://www.designboom.com/wp-content/uploads/2019/05/instagram-likes-less-harmful-new-features-designboom-1200.jpg",
    title: "Instagram Likes"
    },
    {
    backgroundImage: "https://i.ytimg.com/vi/cB0RNVdyVXY/maxresdefault.jpg",
    title: "Instagram Followers"
    },
    {
    backgroundImage: "https://socialpros.co/wp-content/uploads/2020/12/5K-Likes-On-Instagram-ink-1.jpg",
    title: "Instagram Likes Per Post"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.g32oTXMnlydJYvNdvBDYOwHaEX?pid=ImgDet&rs=1",
    title: "Instagram Comments"
    }
];
const FaceBook = [
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.mLZD7IAVaXjG8bLAqFv1AwHaE8?pid=ImgDet&rs=1",
    title: "Facebook Likes"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.W3qrKzQaCXo5l5DkkGvr0QHaEX?pid=ImgDet&rs=1",
    title: "Facebook Followers"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.Eicei9SOYJ6ZjNH9zV441QHaFL?pid=ImgDet&rs=1",
    title: "Facebook Likes Per Post"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/R.21b8f2eb564b0403691b5261ad761569?rik=mZWm1Wh3ogBXvA&pid=ImgRaw&r=0&sres=1&sresct=1",
    title: "Facebook Comments"
    }
];
const Youtube = [
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.WQDEG_a1jBZQiEjeEji6OQHaEK?pid=ImgDet&rs=1",
    title: "Youtube Likes"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.xxOVtPY-yi0JMPTkrQEdegHaDw?pid=ImgDet&rs=1",
    title: "Youtube Subscribers"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.UDiuh-QNmm1327_-YByYvAHaFy?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Youtube Likes Per video"
    },
    {
    backgroundImage: "https://i.ytimg.com/vi/PNvtdyY6RQI/maxresdefault.jpg",
    title: "Youtube Comments"
    }
];
const Telegram = [
    {
    backgroundImage: "https://botfortelegram.com/wp-content/uploads/2021/01/likes-bot-telegram.jpg",
    title: "Telegram Likes"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.oz9rMg-bpZIiLKNNjrxjNgHaEK?pid=ImgDet&rs=1",
    title: "Telegram Subscribers"
    },
    {
    backgroundImage: "https://quadlayers.com/wp-content/uploads/2021/03/05.-WP-Telegram-Comments.png",
    title: "Telegram Comments"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/R.745f5cb3b35c3559dac10ea7aa9a36ac?rik=6qycPobpsh%2fYYQ&pid=ImgRaw&r=0",
    title: "Telegram Mindblowing Channels"
    }
];
const Threads = [
    {
    backgroundImage: "https://botfortelegram.com/wp-content/uploads/2021/01/likes-bot-telegram.jpg",
    title: "Threads Likes"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/OIP.oz9rMg-bpZIiLKNNjrxjNgHaEK?pid=ImgDet&rs=1",
    title: "Threads Subscribers"
    },
    {
    backgroundImage: "https://quadlayers.com/wp-content/uploads/2021/03/05.-WP-Telegram-Comments.png",
    title: "Threads Comments"
    },
    {
    backgroundImage: "https://th.bing.com/th/id/R.745f5cb3b35c3559dac10ea7aa9a36ac?rik=6qycPobpsh%2fYYQ&pid=ImgRaw&r=0",
    title: "Threads Mindblowing Channels"
    }
];


const alloptionsParent = document.getElementById("alloptions-con");

// buttons
const InstagramButton = document.getElementById("btn-instagram");
const FacebookButton = document.getElementById("btn-facebook");
const YoutubeButton = document.getElementById("btn-youtube");
const TelegramButton = document.getElementById("btn-telegram");
const ThreadsButton = document.getElementById("btn-threads")

const ButtonParent = Array.from(document.getElementsByClassName("main-down-buttons-con-ch")); //Parent Button
const removeBlackBtn = () => {
    ButtonParent.forEach((each) => {
        each.classList.remove("blackBTN");
    })
}


const MakeTheButtonDark = (elem) => {
    elem.classList.add("blackBTN")
}

const createSonsByClicking = (backgroundImage, title) => {
    const createdSon = document.createElement("div");
    createdSon.classList.add("alloptions-son");
    createdSon.innerHTML = `<img src="${backgroundImage}" alt="">
    <div class="alloptions-son-1"></div>
    <div class="alloptions-son-2">
    <span class="span-1">${title}</span>
    <span class="material-symbols-outlined span-2">favorite</span>
    </div>`;
    alloptionsParent.appendChild(createdSon);
}
const makeAlloptionsParentEmpty = () => {
    alloptionsParent.innerHTML = "";
}

InstagramButton.addEventListener("click", () => {
    removeBlackBtn();
    MakeTheButtonDark(InstagramButton);
    makeAlloptionsParentEmpty();
    if(alloptionsParent.innerHTML === ""){
        Instagram.forEach((eachData) => {
            createSonsByClicking(eachData.backgroundImage, eachData.title);
        });
    }else{
        alert("sorry cannot add element Instagram");
    }
});
FacebookButton.addEventListener("click", () => {
    removeBlackBtn();
    MakeTheButtonDark(FacebookButton);
    makeAlloptionsParentEmpty();
    if(alloptionsParent.innerHTML === ""){
        FaceBook.forEach((eachData) => {
            createSonsByClicking(eachData.backgroundImage, eachData.title);
        });
    }else{
        alert("sorry cannot add element facebook");
    }
});
YoutubeButton.addEventListener("click", () => {
    removeBlackBtn();
    MakeTheButtonDark(YoutubeButton);
    makeAlloptionsParentEmpty();
    if(alloptionsParent.innerHTML === ""){
        Youtube.forEach((eachData) => {
            createSonsByClicking(eachData.backgroundImage, eachData.title);
        });
    }else{
        alert("sorry cannot add element facebook");
    }
});
TelegramButton.addEventListener("click", () => {
    removeBlackBtn();
    MakeTheButtonDark(TelegramButton)
    makeAlloptionsParentEmpty();
    if(alloptionsParent.innerHTML === ""){
        Telegram.forEach((eachData) => {
            createSonsByClicking(eachData.backgroundImage, eachData.title);
        });
    }else{
        alert("sorry cannot add element facebook");
    }
});
ThreadsButton.addEventListener("click", () => {
    removeBlackBtn();
    MakeTheButtonDark(ThreadsButton)
    makeAlloptionsParentEmpty();
    if(alloptionsParent.innerHTML === ""){
        Threads.forEach((eachData) => {
            createSonsByClicking(eachData.backgroundImage, eachData.title);
        });
    }else{
        alert("sorry cannot add element facebook");
    }
});