const tableBTN = document.getElementsByClassName("tableBTN");
const ArrayoftableBTN = Array.from(tableBTN);
const fetchLink = "https://squadspeaks.com/";

ArrayoftableBTN.forEach(async(eac) => {
    const tableNo = eac.innerText;
    const data = await fetch(`${fetchLink}allTableFood?orderTable=${tableNo}`);
    const response = await data.json();
    const totalPrice = response[0].price;
    if(totalPrice === ""){
        console.log(tableNo+ " Has no order");
    }else{
        const createdElement = document.createElement("span");
        createdElement.innerText = `£${totalPrice}`;
        eac.appendChild(createdElement);
    }
})