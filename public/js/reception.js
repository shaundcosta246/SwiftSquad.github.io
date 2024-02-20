// let TimeBtn = document.getElementsByClassName("time");
// const TimeBtnArray = Array.from(TimeBtn)
// TimeBtnArray.forEach((elm) => {
//     elm.addEventListener("click", () => {
//         const currentTime = new Date();
//         const hours = currentTime.getHours();
//         const minutes = currentTime.getMinutes();
//         // added time  
//         let addedHours = currentTime.getHours() + 2;
//         let addedMinutes = currentTime.getMinutes() + 60;
//         if (addedMinutes >= 60) {
//             addedMinutes -= 60;
//             addedHours++;
//         }
//         const ti = `${hours}.${minutes}`;
//         const ad = `${addedHours}.${addedMinutes}`
//         console.log(`${ti} is current time`);
//         console.log(`${ad} is added time`);
//     })
// });

const fetchLink = "https://squadspeaks.onrender.com/";


let mainChild = document.getElementsByClassName("main-child");
let mainChildArray = Array.from(mainChild);
mainChildArray.forEach(async(eac) => {
    // console.log(eac);
    let childers = eac.querySelector(".tableBTN");
    const tableTF = childers.innerText;

    const data = await fetch(`${fetchLink}allTableFood?orderTable=${tableTF}`);
    const response = await data.json();
    if(response[0] === undefined){
        console.log("Empty Table...")
    }else{
        console.log(response[0]);
        const createdElement = document.createElement("div")
        createdElement.classList.add("time");
        createdElement.innerText = `${response[0].startTime} - ${response[0].endTime}`;
        eac.appendChild(createdElement);
    }
})