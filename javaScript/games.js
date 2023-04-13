let gameSlider = document.querySelector('.game-slider')
let cardEls = document.querySelectorAll('.card')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if(document.documentElement.clientWidth >= 800){

cardEls[1].style.transform = "scale(1.2)"

for(let i = 0; i < cardEls.length; i++){
cardEls[i].onclick = function(){

    for(let j = 0; j < cardEls.length; j++){
        cardEls[j].style.transform = "scale(1)"
    }
    
    cardEls[i].style.transform = "scale(1.2)"
    if(i == 0){
    gameSlider.style.left = "20%"
    }else if(i == 1){
    gameSlider.style.left = "0%"
    }else if(i == 2){
    gameSlider.style.left = "-20%"
    }
}
}
}


async function handleViewportResize() {
    await sleep(100)
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    
    console.log("Viewport Width: " + viewportWidth + "px");
    
    location.reload()
}
      
window.addEventListener("resize", handleViewportResize);