let page1El = document.querySelector('#page1')
let page2El = document.querySelector('#page2')
let svarEl = document.querySelector('#svar')
let cheatImg = document.querySelector('#cheat_img')
let page3El = document.querySelector('#page3')
let page4El = document.querySelector('#page4')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ---------- enchanting to normal ---------- */

svarEl.addEventListener('keyup', bla)

let bokstaver = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

page2El.style.transform = "translateX(80vw)"
let page1 = false
let blaMulig = true
let bokstav = Math.floor(Math.random()*bokstaver.length)
page1El.innerHTML = bokstaver[bokstav]
async function bla(e){
    svarEl.style.fontSize = "0px"
    console.log("bla", e.key, bokstaver[bokstav])
    if(e.key == bokstaver[bokstav]){
        page1El.style.backgroundImage = "url(../bilder/enchanting_page_green.png)"
        page2El.style.backgroundImage = "url(../bilder/enchanting_page_green.png)"
        bokstav = Math.floor(Math.random()*bokstaver.length)
        if(page1 == false && blaMulig == true){
            page2El.innerHTML = bokstaver[bokstav]
            page1 = !page1
            blaMulig = !blaMulig
            page2El.style.transition = "transform 0.5s"
            page1El.style.transition = "transform 0.5s"
            page1El.style.transform = "translateX(-80vw)"
            page2El.style.transform = "translateX(0)"
            await sleep (500)
            page1El.style.transition = "none"
            page1El.style.transform = "translateX(80vw)"
            blaMulig = !blaMulig
        }else if(page1 == true && blaMulig == true){
            page1El.innerHTML = bokstaver[bokstav]
            page1 = !page1
            blaMulig = !blaMulig
            page1El.style.transition = "transform 0.5s"
            page2El.style.transition = "transform 0.5s"
            page2El.style.transform = "translateX(-80vw)"
            page1El.style.transform = "translateX(0)"
            await sleep (500)
            page2El.style.transition = "none"
            page2El.style.transform = "translateX(80vw)"
            blaMulig = !blaMulig
        }
        page1El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
        page2El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
    }else{
        page1El.style.backgroundImage = "url(../bilder/enchanting_page_red.png)"
        page2El.style.backgroundImage = "url(../bilder/enchanting_page_red.png)"
        await sleep(500)
        page1El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
        page2El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
    }
    svarEl.value = ""
    svarEl.style.fontSize = "30px"
}

/* ---------- normal to enchanting ---------- */

page4El.style.transform = "translateX(80vw)"
let bokstav2 = Math.floor(Math.random()*bokstaver.length)
page3El.innerHTML = bokstaver[bokstav2]

let page3 = false
async function bla2(e){
    console.log("bla2",e.target.classList[0], bokstaver[bokstav2])
    if(e.target.classList[0] == bokstaver[bokstav2]){
        bokstav2 = Math.floor(Math.random()*bokstaver.length)
        page3El.style.backgroundImage = "url(../bilder/enchanting_page_green.png)"
        page4El.style.backgroundImage = "url(../bilder/enchanting_page_green.png)"
        if(page3 == false && blaMulig == true){
            page4El.innerHTML = bokstaver[bokstav2]
            page3 = !page3
            blaMulig = !blaMulig
            page4El.style.transition = "transform 0.5s"
            page3El.style.transition = "transform 0.5s"
            page3El.style.transform = "translateX(-80vw)"
            page4El.style.transform = "translateX(0)"
            await sleep (500)
            page3El.style.transition = "none"
            page3El.style.transform = "translateX(80vw)"
            blaMulig = !blaMulig
        }else if(page3 == true && blaMulig == true){
            page3El.innerHTML = bokstaver[bokstav2]
            page3 = !page3
            blaMulig = !blaMulig
            page3El.style.transition = "transform 0.5s"
            page4El.style.transition = "transform 0.5s"
            page4El.style.transform = "translateX(-80vw)"
            page3El.style.transform = "translateX(0)"
            await sleep (500)
            page4El.style.transition = "none"
            page4El.style.transform = "translateX(80vw)"
            blaMulig = !blaMulig
        }
        page3El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
        page4El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
    }else{
        page3El.style.backgroundImage = "url(../bilder/enchanting_page_red.png)"
        page4El.style.backgroundImage = "url(../bilder/enchanting_page_red.png)"
        await sleep(500)
        page3El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
        page4El.style.backgroundImage = "url(../bilder/enchanting_page.png)"
    }
}

let keyboardEl = document.querySelector('.keyboard')
let row1El = document.querySelector('.row1')
let row2El = document.querySelector('.row2')
let row3El = document.querySelector('.row3')
let keyEls = document.querySelectorAll('.keyboard img')

let qwerty = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']

for(let i=0; i<keyEls.length; i++){
    keyEls[i].addEventListener('click', bla2)
    keyEls[i].classList.add(qwerty[i])
}

