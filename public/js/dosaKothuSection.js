const socket = io();

let dosaDivPar = document.getElementById("dosa-1");
let kothuDivPar = document.getElementById("kothu-2");

socket.on("foodfordosasection", (data) => {
    console.log(data)
    let check = data.MAINS;
    check.forEach(element => {
        if(element.foodname === "Dosa(V)"){
            const createdElement = document.createElement("div");
            createdElement.classList.add("mitemslist");
            createdElement.innerHTML = `
                <span class="tableNo">${data.tableNo}</span>
                <span class="foodName">Dosa</span>
                <span class="material-symbols-outlined Xicon">close</span>
            `;
            dosaDivPar.appendChild(createdElement);
        }
        if(element.foodname === "Podi Dosa(VG)"){
            const createdElement = document.createElement("div");
            createdElement.classList.add("mitemslist");
            createdElement.innerHTML = `
                <span class="tableNo">${data.tableNo}</span>
                <span class="foodName">Podi Dosa(VG)</span>
                <span class="material-symbols-outlined Xicon">close</span>
            `;
            dosaDivPar.appendChild(createdElement);
        }
        if(element.foodname === "Chilli Cheese Dosa(V)"){
            const createdElement = document.createElement("div");
            createdElement.classList.add("mitemslist");
            createdElement.innerHTML = `
                <span class="tableNo">${data.tableNo}</span>
                <span class="foodName">Chilli Cheese Dosa(V)</span>
                <span class="material-symbols-outlined Xicon">close</span>
            `;
            dosaDivPar.appendChild(createdElement);
        }
        if(element.foodname === "Masala Dosa(V)"){
            const createdElement = document.createElement("div");
            createdElement.classList.add("mitemslist");
            createdElement.innerHTML = `
                <span class="tableNo">${data.tableNo}</span>
                <span class="foodName">Masala Dosa(V)</span>
                <span class="material-symbols-outlined Xicon">close</span>
            `;
            dosaDivPar.appendChild(createdElement);
        }
        const Xicon = document.getElementsByClassName("Xicon");
        let XiconArray = Array.from(Xicon);
        XiconArray.forEach((eac) => {
            eac.addEventListener("click", (e) => {
                e.target.parentElement.remove()
            })
        })
    });
})