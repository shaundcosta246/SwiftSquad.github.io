const menuNav = document.getElementById("menu-nav");
const sideNavBar = document.getElementById("side-nav-bar");
let count = 1;
menuNav.addEventListener("click", () => {
    if(count === 1){
        sideNavBar.style.display ="flex";
        sideNavBar.style.transform="translateX(0px)";
        count++;
    }else{
        sideNavBar.style.transform="translateX(1000px)";
        sideNavBar.style.display ="none";
        count--;
    }
})