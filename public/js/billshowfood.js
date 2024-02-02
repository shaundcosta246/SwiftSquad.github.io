const tableNo = document.getElementById("tableNo").innerText;
const localFetch = `http://localhost:8000/allTableFood?orderTable=${tableNo}`
const liveFetch = `https://squadspeaks.onrender.com/allTableFood?orderTable=${tableNo}`;
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