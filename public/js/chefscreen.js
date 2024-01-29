const socket = io();


const refreshPage = () => {
    location.reload();
}

// parent container 
const foodParent = document.getElementById("main-1");

socket.on("foodforchef", (data) => {
    const foodCon = document.createElement("div");
    foodCon.classList.add("main-1-items");
    foodParent.appendChild(foodCon);

    const createdElementS = document.createElement("div");
    createdElementS.classList.add("foodHeading");
    createdElementS.innerHTML = `SHORT EATS <span>${data.tableNo}</span>`;
    foodCon.appendChild(createdElementS)
    data.SHORTEATS.forEach((e) => {
        const createdElement = document.createElement("div");
        createdElement.classList.add("foodItems");
        createdElement.innerText = e.foodname;
        foodCon.appendChild(createdElement)
        createdElement.addEventListener("click", (elm) => {
            if(elm.currentTarget.style.background === "rgb(55, 212, 55)"){
                elm.currentTarget.style.background = "red";
            }else{
                console.log("Hello")
                elm.currentTarget.style.background = "rgb(55, 212, 55)";
            }
        })
    })
    setTimeout(() => {
        const foodCon = document.createElement("div");
        foodCon.classList.add("main-1-items");
        foodParent.appendChild(foodCon);
        const createdElementS = document.createElement("div");
        createdElementS.classList.add("foodHeading");
        createdElementS.innerHTML = `MAINS <span>${data.tableNo}</span>`;
        foodCon.appendChild(createdElementS)    
        data.MAINS.forEach((e) => {
            const createdElement = document.createElement("div");
            createdElement.classList.add("foodItems");
            createdElement.innerText = e.foodname;
            foodCon.appendChild(createdElement)
            createdElement.addEventListener("click", (elm) => {
                if(elm.currentTarget.style.background === "rgb(55, 212, 55)"){
                    elm.currentTarget.style.background = "red";
                }else{
                    console.log("Hello")
                    elm.currentTarget.style.background = "rgb(55, 212, 55)";
                }
            })
        })
    }, 5000)
    setTimeout(() => {
        const foodCon = document.createElement("div");
        foodCon.classList.add("main-1-items");
        foodParent.appendChild(foodCon);
        const createdElementS = document.createElement("div");
        createdElementS.classList.add("foodHeading");
        createdElementS.innerHTML = `GRILLS <span>${data.tableNo}<span>`;
        foodCon.appendChild(createdElementS);
        data.GRILLS.forEach((e) => {
            const createdElement = document.createElement("div");
            createdElement.classList.add("foodItems");
            createdElement.innerText = e.foodname;
            foodCon.appendChild(createdElement);
            createdElement.addEventListener("click", (elm) => {
                if(elm.currentTarget.style.background === "rgb(55, 212, 55)"){
                    elm.currentTarget.style.background = "red";
                }else{
                    console.log("Hello")
                    elm.currentTarget.style.background = "rgb(55, 212, 55)";
                }
            })
        })
    }, 10000)
})