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


const textInsidemain = document.getElementById("main-text-effect");
const phrases = ['Hi, Here we go!', 'Connect with your friends throught us....', 'Its very easy.... good luck'];
let i = 0
let j = 0
let currentPhrase = []
let isDeleting = false

function loop(){
    textInsidemain.innerText = currentPhrase.join("")
    if(i < phrases.length){
        if(!isDeleting && j <=  phrases[i].length){
            currentPhrase.push(phrases[i][j])
            j++
        }
        if(isDeleting && j <= phrases[i].length){
            currentPhrase.pop(phrases[i][j])
            j--
        }
        if(j == phrases[i].length){
            isDeleting = true;
        }
        if(isDeleting && j === 0){
            currentPhrase = []
            isDeleting = false
            i++
            if(i == phrases.length){
                i = 0;
            }
        }
    }
    setTimeout(loop, 80)
}
loop()