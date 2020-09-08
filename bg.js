const body = document.querySelector('body');

const IMG_NUMBER = 3;

/*
api용
function handleImgLoad() {
    console.log("finished loading");
}
*/

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    body.appendChild(image);
    image.classList.add("bgImage");
    //api용
    //image.addEventListener("loadend", handleImgLoad);
}   

function genRandom() {
    //  내림 랜텀 숫자
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();