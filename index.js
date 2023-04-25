const medianavbar = document.getElementById('medai800bar');
const spanmenu = document.getElementById('nav-menu');
let slide = 1;

spanmenu.addEventListener('click', () => {
    if(slide === 1){
        medianavbar.style.display = "flex";
        slide++;
    }else{
        medianavbar.style.display = "none";
        slide--;
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

const Prob = document.getElementsByClassName("prob-2");
const nav = document.getElementById("nav");