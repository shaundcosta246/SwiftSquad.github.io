const tableBTN = document.getElementsByClassName("tableBTN");
const ArrayoftableBTN = Array.from(tableBTN);
const localFetch = `http://localhost:8000/allTableFood?orderTable=${tableNo}`
const liveFetch = `https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNo}`;
ArrayoftableBTN.forEach(async(eac) => {
    const tableNo = eac.innerText;
    const data = await fetch(`https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNo}`);
    const response = await data.json();
    const totalPrice = response[0].price;
    if(totalPrice === ""){
        console.log(tableNo+ " Has no order");
    }else{
        const createdElement = document.createElement("span");
        createdElement.innerText = `£${totalPrice}`;
        const parentElement = eac.parentNode;
        eac.appendChild(createdElement);
    }
})