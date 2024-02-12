const tableNo = document.getElementById("tableNo").innerText;
// "http://localhost:8000"
// "https://squadspeaks.onrender.com/"
const getTableData = async() => {
    try{
        const data = await fetch(`https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNo}`);
    const response = await data.json();
    const Data = response[0];
    console.log(Data);
    }catch(error){
        console.log(error);
    }
}
getTableData();