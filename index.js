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

let distanceMoved = -233.33;
const movingImages = document.getElementById("move-images");
const movingImagesDivWidth = getComputedStyle(movingImages).width;
console.log(movingImagesDivWidth);
let moveImg = () => {
    movingImages.style.transition = "3s";
    movingImages.style.transform = `translateX(${distanceMoved}px)`;
    distanceMoved = -233.33 + distanceMoved; 
    if(distanceMoved === -1866.6399999999999){
        movingImages.style.transition = "0s";
        movingImages.style.transform = `translateX(0px)`;
        distanceMoved = -233.33;
        movingImages.style.transition = "1s";
    }
}
setInterval(() => {
    moveImg()
}, 9000);