const socket = io();


const refreshPage = () => {
    location.reload();
}

// all navigation buttons
const navigationBtns = document.getElementsByClassName("nav-btn");
const ShortEatsbtn = document.getElementById("shortEats");
const hopperDosabtn = document.getElementById("hopperDosa");
const karisbtn = document.getElementById("karis");
const grillsbtn = document.getElementById("grills");
const sidesbtn = document.getElementById("sides");
const dessertsbtn = document.getElementById("desserts");

// parent container for food 
const foodParContainer = document.getElementById("main-item-con");

// function for all addeventlistener
const clearfoodcontent = () => {
    foodParContainer.innerHTML = "";
}
const arrayofnavbtn = Array.from(navigationBtns);
const clearallbtncolor = () => {
    arrayofnavbtn.forEach((e) => {
        e.style.background = "rgba(0, 0, 0, 0.693)";
    })
}
clearallbtncolor();
// Food menubar
const SHORTEATS = [
    {
        img: "https://2.bp.blogspot.com/-vmw9Cknw63s/VDNL68TbLNI/AAAAAAAAKFg/hwQHOrB_MKk/w640-h464/Paneer%2BVegetable%2BCutlets.JPG",
        foodname: "Jackfruit Cutlets(V)",
        foodprice: "7.5"
    },
    {
        img: "https://media-cdn2.greatbritishchefs.com/media/aw4pgohh/gbchoppermay2022014.whqc_768x512q80.jpg",
        foodname: "Devilled Paneer(V)",
        foodprice: "9"
    },
    {
        img: "https://loveincorporated.blob.core.windows.net/contentimages/main/c5cfd8c4-0eae-4aae-a7df-00a5cc5757f0-hot-butter-squid.jpg",
        foodname: "Hot Butter Squid",
        foodprice: "11"
    },
    {
        img: "https://images.deliveryhero.io/image/talabat/MenuItems/Mutton_rolls_+_Lankan_Kte638156278632860218.jpg",
        foodname: "Mutton Rolls + SL Hot Sauce",
        foodprice: "8"
    },
    {
        img: "https://www.twinklepost.com/wp-content/uploads/2021/06/Chettinad-Chicken-fry.jpg",
        foodname: "Chicken Chettinadu Bites",
        foodprice: "9.5"
    },
    {
        img: "https://1.bp.blogspot.com/-4TwWAI1qHkI/Wu7nL8HJzMI/AAAAAAAAW_Q/Q9-9Nh_xLKEJfF85EollzXZgDWiS3z3uQCLcBGAs/s1600/beef%2Bfry%2B1i.JPG",
        foodname: "Beef Rib Fry",
        foodprice: "12"
    },
    {
        img: "https://cdn.shopify.com/s/files/1/0265/8847/9530/products/sri-lankan-bone-marrow-varuval-feast-hoppers-847447.jpg?v=1673967602",
        foodname: "Bone Marrow Varuval + Roti",
        foodprice: "13.5"
    },
    {
        img: "https://th.bing.com/th/id/R.fe2b014698de6bcbe9e75ff7212822fb?rik=Dn8HAqn013%2fINA&pid=ImgRaw&r=0",
        foodname: "Lamb Kothu Roti",
        foodprice: "13.5"
    }
];

const HOPPERSDOSA = [
    {
        img: "https://media.blogto.com/articles/f71e-20100407-Hopper20Hut20trad20hopper.JPG?w=2048&cmd=resize_then_crop&height=1365&quality=70",
        foodname: "Hopper(VG)",
        foodprice: "5.5"
    },
    {
        img: "https://image.shutterstock.com/image-photo/sri-lankan-egg-hopper-bittara-260nw-446640724.jpg",
        foodname: "Egg Hopper",
        foodprice: "6"
    },
    {
        img: "https://th.bing.com/th/id/OIP.A2Zek_LoZ3dQDpqYRM1eIgHaFj?rs=1&pid=ImgDetMain",
        foodname: "String Hoppers(VG)",
        foodprice: "4.5"
    },
    {
        img: "https://th.bing.com/th/id/R.16e2a8cddd8442fb3ada08c7a4a5de40?rik=eSTnOaN5PIM9%2bA&riu=http%3a%2f%2fi.justcooking.in%2fmedia%2fDosa1.jpg&ehk=nCpAnqObZSe%2b39YzC4KJyMOgPE3FKrD2Q63hyumQeug%3d&risl=&pid=ImgRaw&r=0",
        foodname: "Dosa(V)",
        foodprice: "5.5"
    },
    {
        img: "https://th.bing.com/th/id/OIP.J4lGq4GBWhnO96JwwMsJ1gAAAA?w=279&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        foodname: "Podi Dosa(VG)",
        foodprice: "5.5"
    },
    {
        img: "https://www.lassiwithlavina.com/wp-content/uploads/2022/10/Dosas-at-Hoppers.jpg",
        foodname: "Chilli Cheese Dosa(V)",
        foodprice: "7"
    },
    {
        img: "https://foodiewish.com/wp-content/uploads/2020/05/Masala-Dosa-Recipe.jpg",
        foodname: "Masala Dosa(V)",
        foodprice: "9"
    }
];

const KARIS = [
    {
        img: "https://www.lowlyfood.com/wp-content/uploads/2021/07/aubergine-and-potato-curry-37.jpg",
        foodname: "Aubergine Kari(VG)",
        foodprice: "9.5"
    },
    {
        img: "https://th.bing.com/th/id/OIP.pYjfipX6DTOo9fR4XRQrBAAAAA?rs=1&pid=ImgDetMain",
        foodname: "Breadfruit Kari(VG)",
        foodprice: "10"
    },
    {
        img: "https://th.bing.com/th/id/R.1c3d217597572d7a2102c579e4bfef15?rik=6vG7CqW9QfFIVw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-shqfzC4o8gk%2fT8dhhP5DxdI%2fAAAAAAAAE8Y%2fUz3lvoI-Gtc%2fs1600%2f008.JPG&ehk=Y%2bxzSwMWZJmkwwm1NTrT3VR7sXzuxHTQo6daifQiPOw%3d&risl=&pid=ImgRaw&r=0",
        foodname: "Prawn Kari",
        foodprice: "13.5"
    },
    {
        img: "https://th.bing.com/th/id/R.9d34f9b6f1e4d14a79f7345c0baa04ca?rik=kN2x9kq%2fB3Y4yw&pid=ImgRaw&r=0",
        foodname: "Chicken Kari",
        foodprice: "11.5"
    },
    {
        img: "https://cookerybay.com/wp-content/uploads/2023/06/Sri-Lankan-Black-Pork-Curry.jpg",
        foodname: "Pork Kari",
        foodprice: "12.5"
    },
    {
        img: "https://4.bp.blogspot.com/-32rPva7AXvE/Us2WAVoN6-I/AAAAAAAAFmM/spllPuupdgo/s1600/DSC06759.jpg",
        foodname: "Lamb Kari",
        foodprice: "13.5"
    }
];

const RICEROAST = [
    {
        img: "https://cookingfromheart.com/wp-content/uploads/2017/09/Veg-Biryani-in-Pressure-Cooker-6.jpg",
        foodname: "Root Veg Buriani + Raita(V)",
        foodprice: "19"
    },
    {
        img: "https://th.bing.com/th/id/OIP.Z9SQHyPG6zMXKxOdkvM7wgHaE8?rs=1&pid=ImgDetMain",
        foodname: "Roasted Half Chicken",
        foodprice: "16"
    },
    {
        img: "https://th.bing.com/th/id/OIP.er1Gr9IUMiCMtFeZdSHdAAHaE8?rs=1&pid=ImgDetMain",
        foodname: "Chicken Buriani + Raita",
        foodprice: "20"
    },
    {
        img: "https://i.pinimg.com/originals/44/3d/92/443d927a1a0183ef438f63aab1952de0.jpg",
        foodname: "Banana Lemongrass Bream",
        foodprice: "25"
    },
    {
        img: "https://tudorraj.com/wp-content/uploads/2022/02/lamb_biryani_pot-e1645637001602-1024x1024.jpg",
        foodname: "Lamb Shank Buriani",
        foodprice: "28"
    }
];

const SIDES = [
    {
        img: "https://images.notquitenigella.com/images/sri-lankan-pickled-eggplant-brinjal-moju/__sri-lankan-pickled-eggplant-brinjal-moju-04.jpg",
        foodname: "Brinjal Moju(VG)",
        foodprice: "3.5"
    },
    {
        img: "https://www.mariaushakova.com/wp-content/uploads/2017/07/Detox-Kale-and-Beet-Salad-250.jpg",
        foodname: "Kale Mallung(VG)",
        foodprice: "4"
    },
    {
        img: "https://www.indianveggiedelight.com/wp-content/uploads/2017/06/cucumber-raita-recipe-featured.jpg",
        foodname: "Curry Leaf + Mustard Raita(V)",
        foodprice: "3"
    },
    {
        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/08/butternut-squash-dal-featured-720x720.jpg",
        foodname: "Dhal Kari(VG)",
        foodprice: "5"
    },
    {
        img: "https://th.bing.com/th/id/OIP.Gj4SRlxGTfsXGA-1ZzozWgHaFj?rs=1&pid=ImgDetMain",
        foodname: "Drumstick Sambhar(VG)",
        foodprice: "5.5"
    },
    {
        img: "https://th.bing.com/th/id/OIP.RDISxyAsO44pDZ3PySluKQHaFj?rs=1&pid=ImgDetMain",
        foodname: "Basmati Rice(VG)",
        foodprice: "4"
    },
    {
        img: "https://th.bing.com/th/id/OIP.N-uDV90HC9ViF7LRbVz5JgHaFj?w=2048&h=1536&rs=1&pid=ImgDetMain",
        foodname: "Plain Idli(VG)",
        foodprice: "2.5"
    },
    {
        img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2015/07/potato-masala-for-dosa.jpg",
        foodname: "Potato Fry(VG)",
        foodprice: "4.5"
    },
    {
        img: "https://th.bing.com/th/id/R.4d155d67da9b1ec04e2e9b4aaf04d4ff?rik=f5loYdVyCXJstw&pid=ImgRaw&r=0",
        foodname: "Roti(VG)",
        foodprice: "3.5"
    },
    {
        img: "https://ceylonspot.com/images/menu-Milk-curry.png",
        foodname: "Kiri Hodi(VG)",
        foodprice: "4.5"
    }
];


const DESSERT = [
    {
        img: "https://lonumedhu.com/sites/default/files/ChocolateBisuitPudding1.jpg",
        foodname: "Chocolate Biskut Pudding(V)",
        foodprice: "6.5"
    },
    {
        img: "https://i.pinimg.com/736x/f0/d0/ed/f0d0ed56e6a5a70c176856d4f938919e.jpg",
        foodname: "Wattalapam Pudding(V)",
        foodprice: "6.5"
    }
];

let tableNumber = document.getElementById("tableNo-i");

let OrderToBeSent = {
    SHORTEATS: [],
    MAINS: [],
    GRILLS: [],
    tableNo: tableNumber.innerText,
    totalPrice: 0
};


ShortEatsbtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    ShortEatsbtn.style.background = "#ff0000ba";
    SHORTEATS.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        createdElement.addEventListener("click", (event) => {
            const foodname = event.currentTarget.querySelector('.main-item-con-p span:first-child').innerText;
            const foodprice = event.currentTarget.querySelector('.main-item-con-p span:nth-child(2)').innerText;
            const shortEats = { foodname: foodname, foodprice: foodprice };
            OrderToBeSent.SHORTEATS.push(shortEats);
        });
    })
})

hopperDosabtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    hopperDosabtn.style.background = "#ff0000ba";
    HOPPERSDOSA.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        createdElement.addEventListener("click", (event) => {
            const foodname = event.currentTarget.querySelector('.main-item-con-p span:first-child').innerText;
            const foodprice = event.currentTarget.querySelector('.main-item-con-p span:nth-child(2)').innerText;
            const maincourse = { foodname: foodname, foodprice: foodprice };
            OrderToBeSent.MAINS.push(maincourse);
        });
    });
})
karisbtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    karisbtn.style.background = "#ff0000ba";
    KARIS.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        createdElement.addEventListener("click", (event) => {
            const foodname = event.currentTarget.querySelector('.main-item-con-p span:first-child').innerText;
            const foodprice = event.currentTarget.querySelector('.main-item-con-p span:nth-child(2)').innerText;
            const maincourse = { foodname: foodname, foodprice: foodprice };
            OrderToBeSent.MAINS.push(maincourse);
        });
    })
})
grillsbtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    grillsbtn.style.background = "#ff0000ba";
    RICEROAST.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        createdElement.addEventListener("click", (event) => {
            const foodname = event.currentTarget.querySelector('.main-item-con-p span:first-child').innerText;
            const foodprice = event.currentTarget.querySelector('.main-item-con-p span:nth-child(2)').innerText;
            const grills = { foodname: foodname, foodprice: foodprice };
            OrderToBeSent.GRILLS.push(grills);
        });
    })
})
sidesbtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    sidesbtn.style.background = "#ff0000ba";
    SIDES.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        createdElement.addEventListener("click", (event) => {
            const foodname = event.currentTarget.querySelector('.main-item-con-p span:first-child').innerText;
            const foodprice = event.currentTarget.querySelector('.main-item-con-p span:nth-child(2)').innerText;
            const maincourse = { foodname: foodname, foodprice: foodprice };
            OrderToBeSent.MAINS.push(maincourse);
        });
    })
})
dessertsbtn.addEventListener("click", () => {
    clearallbtncolor();
    clearfoodcontent();
    dessertsbtn.style.background = "#ff0000ba";
    DESSERT.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("main-items");
        createdElement.innerHTML = `
        <div class="shadeimg"></div>
        <img src="${e.img}" alt="">
        <div class="main-item-con-p">
            <span>${e.foodname}</span>
            <span>£${e.foodprice}</span>
        </div>
        `;
        foodParContainer.appendChild(createdElement);
        console.log(OrderToBeSent);
    })
})


let dfwaiterFood = document.getElementById("main-2-fromtotal");
const totalFoodPrice = document.getElementById("totalPrice");
setInterval(() => {
    dfwaiterFood.innerHTML = ``;
    const tableInfo = document.createElement("div");
    tableInfo.classList.add("tableInfo");
    tableInfo.innerHTML = `
        <span id="TableNo">${tableNumber.innerText}</span>
        <span id="time-s-e">13.20 - 14.40</span>
    `;
    dfwaiterFood.appendChild(tableInfo);

    let foodheading = document.createElement("div")
    foodheading.classList.add("foodtimeparts");
    foodheading.innerText = "SHORT EATS";
    dfwaiterFood.appendChild(foodheading);
    let totalShortsP = 0;
    OrderToBeSent.SHORTEATS.forEach((eac) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("foodl-price");
        totalShortsP += parseFloat(eac.foodprice);
        createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        dfwaiterFood.appendChild(createdElement);
        createdElement.addEventListener("dblclick", (elm) => {
            const foodname = elm.currentTarget.querySelector('.foodl-price span:first-child').innerText;
            const foodprice = elm.currentTarget.querySelector('.foodl-price span:nth-child(2)').innerText;
            let indexToDelete = OrderToBeSent["SHORTEATS"].findIndex(item => item.foodname === foodname && item.foodprice === foodprice);
            if (indexToDelete !== -1) {
                OrderToBeSent["SHORTEATS"].splice(indexToDelete, 1);
            }
        })
    })
    let foodheading2 = document.createElement("div")
    foodheading2.classList.add("foodtimeparts");
    foodheading2.innerText = `MAIN COURSE`;
    dfwaiterFood.appendChild(foodheading2);
    let totalMainsP = 0;
    OrderToBeSent.MAINS.forEach((eac) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("foodl-price");
        totalMainsP += parseFloat(eac.foodprice);
        createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        dfwaiterFood.appendChild(createdElement);
        createdElement.addEventListener("dblclick", (elm) => {
            const foodname = elm.currentTarget.querySelector('.foodl-price span:first-child').innerText;
            const foodprice = elm.currentTarget.querySelector('.foodl-price span:nth-child(2)').innerText;
            let indexToDelete = OrderToBeSent["MAINS"].findIndex(item => item.foodname === foodname && item.foodprice === foodprice);
            if (indexToDelete !== -1) {
                OrderToBeSent["MAINS"].splice(indexToDelete, 1);
            }
        })
    })

    let foodheading3 = document.createElement("div")
    foodheading3.classList.add("foodtimeparts");
    foodheading3.innerText = "GRILLS";
    dfwaiterFood.appendChild(foodheading3);
    let totalGrillsP = 0;
    OrderToBeSent.GRILLS.forEach((eac) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("foodl-price");
        totalGrillsP += parseFloat(eac.foodprice);
        createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        dfwaiterFood.appendChild(createdElement);
        createdElement.addEventListener("dblclick", (elm) => {
            const foodname = elm.currentTarget.querySelector('.foodl-price span:first-child').innerText;
            const foodprice = elm.currentTarget.querySelector('.foodl-price span:nth-child(2)').innerText;
            let indexToDelete = OrderToBeSent["GRILLS"].findIndex(item => item.foodname === foodname && item.foodprice === foodprice);
            if (indexToDelete !== -1) {
                OrderToBeSent["GRILLS"].splice(indexToDelete, 1);
            }
        })
    })
    let totalFoodPrice = totalShortsP + totalMainsP + totalGrillsP;
    totalPrice.innerText = totalFoodPrice;
    OrderToBeSent.totalPrice = totalFoodPrice;
}, 700)




// footer section 
const foodItemContainer2 = document.getElementById("main-2-fromtotal");
const sendFoodBtn = document.getElementById("sendFood");
sendFoodBtn.addEventListener("click", async() => {
    let checkifavailable = await fetch(`https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNumber.innerText}`);
    const response = await checkifavailable.json();
    // const totalPrice = response[0].price;
    if(response.length === 0){
        socket.emit("foodtodisplayforchef", OrderToBeSent);
        OrderToBeSent = {
            SHORTEATS: [],
            MAINS: [],
            GRILLS: []
        };
    }else{
        alert("Sorry this order already exists.....")
    }
})



const foodInfo = document.getElementById("FoodInfoBill");
foodInfo.addEventListener("click", async() => {
    clearfoodcontent();
    try{
        const data = await fetch(`https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNumber.innerText}`);
        const response = await data.json();
        const odata = response[0];
        const createParent = document.createElement("div");
        createParent.classList.add("foodInfoCon");
        foodParContainer.appendChild(createParent);
        const createdElement = document.createElement("div");
        createdElement.classList.add("tableInfof");
        createdElement.innerHTML = `
            <span id="TableNo">${tableNumber.innerText}</span>
            <span id="time-s-e">13.20 - 14.40</span>
        `;
        createParent.appendChild(createdElement);
        odata.food.SHORTEATS.forEach((eac) => {
            const createdElement = document.createElement("div");
            createdElement.classList.add("foodl-price");
            createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        createParent.appendChild(createdElement);
        })
        odata.food.MAINS.forEach((eac) => {
            const createdElement = document.createElement("div");
            createdElement.classList.add("foodl-price");
            createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        createParent.appendChild(createdElement);
        })
        odata.food.GRILLS.forEach((eac) => {
            const createdElement = document.createElement("div");
            createdElement.classList.add("foodl-price");
            createdElement.innerHTML = `
            <span class="foodnamelist">${eac.foodname}</span>
            <span class="foodprice">${eac.foodprice}</span>
        `;
        createParent.appendChild(createdElement);
        })
        const createdElementT = document.createElement("div");
        createdElementT.classList.add("tableInfof");
        createdElementT.innerHTML = `
            <span id="totalPrice">£${odata.price}</span>

        `;
        createParent.appendChild(createdElementT)
    }catch(error){
        console.log(error);
    }
})


const addOrderBtn = document.getElementById("addOrder");
addOrderBtn.addEventListener("click", () => {
    socket.emit("updateOrder", OrderToBeSent);
    socket.emit("addfoodtodisplay", OrderToBeSent);
    OrderToBeSent = {
        SHORTEATS: [],
        MAINS: [],
        GRILLS: []
    };
})