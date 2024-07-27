const signForm = document.getElementById("signForm");

signForm.addEventListener("submit", () => {
    let data = {
        name: "Shaun Dcosta"
    }
    localStorage.setItem("info", data.name);
})