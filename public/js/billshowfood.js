const tableNo = document.getElementById("tableNo").innerText;
const getTableData = async() => {
    try{
        const data = await fetch(`http://localhost:8000/allTableFood?orderTable=${tableNo}`);
    const response = await data.json();
    const Data = response[0];
    console.log(Data);
    }catch(error){
        console.log(error);
    }
}
getTableData();