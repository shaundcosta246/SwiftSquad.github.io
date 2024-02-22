const socket = io();
const parentElement = document.getElementById("parentOFadmin");
const clearcontent = () => {
    parentElement.innerHTML = ``;
}

const fetchLink = "https://www.squadspeaks.com/";

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
upBtn.addEventListener("click", async() => {
    const data = await fetch(`${fetchLink}allTableFood`);
    const response = await data.json();
    clearcontent();
    response.forEach(eac => {
        if(eac.orderTable>= 1 && eac.orderTable<= 25){
            const createdElement = document.createElement("div");
            createdElement.classList.add("main-child");
            createdElement.innerHTML = `
            <section class="mainc-1">${eac.orderTable}<span class="material-symbols-outlined">chair</span></section>
            <section class="mainc-2">£${eac.price}</section>
            <section class="mainc-t">${eac.startTime} - ${eac.endTime}</section>
            <section class="mainc-3"><span class="material-symbols-outlined xbtn">cancel</span></section>
            `;
            parentElement.appendChild(createdElement);
        }
    });
    const xBtn = document.getElementsByClassName("xbtn");
    const xBtnArray = Array.from(xBtn);
    xBtnArray.forEach((e) => {
        e.addEventListener("click", (e) => {
            const clickx = e.target;
            const deleteThisp = clickx.parentElement;
            deleteThis = deleteThisp.parentElement;
            let getFirstchild = deleteThis.firstElementChild;
            getFirstchild.firstElementChild.remove();
            let sendData = getFirstchild.innerHTML;
            socket.emit("deleteOrder", sendData);
            // deleteThis.remove();
        })
    })
})
downBtn.addEventListener("click", async() => {
    const data = await fetch(`${fetchLink}allTableFood`);
    const response = await data.json();
    clearcontent();
    response.forEach(eac => {
        if(eac.orderTable>= 40 && eac.orderTable<= 103){
            const createdElement = document.createElement("div");
            createdElement.classList.add("main-child");
            createdElement.innerHTML = `
            <section class="mainc-1">${eac.orderTable}<span class="material-symbols-outlined">chair</span></section>
            <section class="mainc-2">£${eac.price}</section>
            <section class="mainc-t">${eac.startTime}:${eac.endTime}</section>
            <section class="mainc-3"><span class="material-symbols-outlined xbtn">cancel</span></section>
            `;
            parentElement.appendChild(createdElement);
        }
    });
    const xBtn = document.getElementsByClassName("xbtn");
    const xBtnArray = Array.from(xBtn);
    xBtnArray.forEach((e) => {
        e.addEventListener("click", (e) => {
            const clickx = e.target;
            const deleteThisp = clickx.parentElement;
            deleteThis = deleteThisp.parentElement;
            let getFirstchild = deleteThis.firstElementChild;
            getFirstchild.firstElementChild.remove();
            let sendData = getFirstchild.innerHTML;
            socket.emit("deleteOrder", sendData);
            // deleteThis.remove();
        })
    })
})