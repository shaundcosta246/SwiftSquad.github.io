let displayuserimage = () => {
    let par = JSON.parse(localStorage.getItem("userInfo"));
    let accountImage = document.getElementById("accountImage");
    accountImage.src = `uploads/${par.filename}`;
}
displayuserimage();