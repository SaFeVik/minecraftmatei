let playerEl = document.querySelector('.player')
let enemyEl = document.querySelector('.enemy')
let rightArrow = document.querySelector('.right')
let leftArrow = document.querySelector('.left')
let respawnBtn = document.querySelector('#respawn')
let easyBtn = document.querySelector("#easy")
let hardBtn = document.querySelector("#hard")
let startScreen = document.querySelector(".startScreen")
let liveScoreEl = document.querySelector('#liveScore')
let countdownEl = document.querySelector('.countdown')
let scoreEl = document.querySelector('#score')
let showInfoBtn = document.querySelector('#showinfo')
let hideInfoBtn = document.querySelector('#hideinfo')
let aboutGameEl = document.querySelector('.aboutGame')


showInfoBtn.addEventListener('click', ()=>{
    //Gir klassen showAbout til aboutGameEl
    aboutGameEl.classList.add("showAbout")
})


hideInfoBtn.addEventListener('click', ()=>{
    //Fratar klassen showAbout fra aboutGameEl
    aboutGameEl.classList.remove("showAbout")
})

function countDownFunc(){
//Endrer countdownEl sin display atributt til "flex" for at den skal vises
    countdownEl.style.display = "flex"

    //Gir count en verdien 3
    let count = 3

        //Lager en setInterval() funksjon som skal kjøre hvert sekund
    counterInt = setInterval(()=>{
        //Fratar verdien til count med 1 hver gang counterInt kjøres og prosjerer count i countdownEl
        count--
        countdownEl.innerHTML = `${count}`

        //Bruker en if test for å sjekke når count er mindre eller lik 0.
        if(count <= 0){
        //Stopper counterInt når count er mindre eller lik null og gir coundownEl display atributten "none"
        clearInterval(counterInt)
        countdownEl.style.display = "none"
    } 
    },1000)
}

//Lager en eventListner for easyBtn som kjører en arrowfunksjon når klikket på
easyBtn.addEventListener('click', ()=>{
    //Lagrer keyname som som "mode" og keyvalue som "easy" i localStorage
    localStorage.setItem("mode", "easy")

    //Gir startScreen og aboutGameEl display atributten "none"
    startScreen.style.display = "none"
    aboutGameEl.style.display = "none"

    //Bruker setTimeout() funksjonen for å kjøre game() funksjonen om 2 sekuner
    setTimeout(game, 2000)

    //Kjører countDownFunc()
    countDownFunc()
})

//Lager en eventListner for hardBtn som kjører en arrowfunksjon når klikket på
hardBtn.addEventListener('click', ()=>{
    //Lagrer keyname som som "mode" og keyvalue som "hard" i localStorage
    localStorage.setItem("mode", "hard")

    //Gir startScreen og aboutGameEl display atributten "none"
    startScreen.style.display = "none"
    aboutGameEl.style.display = "none"

    //Bruker setTimeout() funksjonen for å kjøre game() funksjonen om 2 sekuner
    setTimeout(game, 2000)

    //Kjører countDownFunc()
    countDownFunc()
})


function game(){

//Lager en eventListner for leftArrow som kjører funkjsonen left() når klikket på
leftArrow.addEventListener('click', left)

//Lager en eventListner for rightArrow som kjører funkjsonen right() når klikket på
rightArrow.addEventListener('click', right)

//Lager en funskjon som knytter venste piltast til left() og høyre piltast til right()
document.onkeydown = function(e){
    switch (e.keyCode){
        case 37: left();
    }
    switch (e.keyCode){
        case 39: right();
    }
}

//Lager en eventListner som refresher nettsider når respawnBtn er klikket på
respawnBtn.addEventListener('click', ()=>{
    location.reload()
})

//Definerer start posisjonen for playerEl
let position = 130
playerEl.style.right = "130px"

//Lager en funksjon som beveger playerEl 130px til venste så lenge playerEl ikke er inntil gameContainer
function left(){
    if(position < 260){
    playerEl.style.right = `${position+130}px`
    position += 130
    }
}

//Lager en funksjon som beveger playerEl 130px til høyre så lenge playerEl ikke er inntil gameContainer
function right(){
    if(position > 0){
    playerEl.style.right = `${position-130}px`
    position -= 130
    }
}

//Lager ett array som inneholder navnet på bildefilene til enemyEl
let enemyBildeArr = ["zombie.png","enderman.png","slime.png","blaze.png","spider.png","skeleton.png"]

//Lager en funksjon som oppdaterer enemyEl sin posisjon og bilde
function enemyUpdate(){

    //Bruker Math.random() til å velge ut en tilfeldig verdi for rdm fra og med 1 til og med 3
    var rdm = Math.floor(Math.random() * 3 + 1)

    //Når rdm har fått verdien sin kjøres 3 if tester som velger hvilket posisjon enemyEl skal få
    if(rdm == 1){
    enemyEl.style.right = "0px"
    }else if(rdm == 2){
    enemyEl.style.right = "130px"
    }else if(rdm == 3){
        enemyEl.style.right = "260px"
    }

    //Bruker Math.random() til å velge ut en tilfeldig verdi for rdmBilde fra og emd 0 til og med lengden til enemyBildeArr-1 for å automatisere prossen 
    var rdmBilde = Math.round(Math.random() * (enemyBildeArr.length-1))

    //Ender bakgrunnbildet til enemyEl ved å bruke verdien til rdmBilde for å velge ut et element fra enemyBildeArr.
    enemyEl.style.backgroundImage = `url('bilder/${enemyBildeArr[rdmBilde]}')`;
    
}

//Lager if tester som sjekker som spilleren har valgt easy eller hard mode
if(localStorage.mode == "easy"){
    //bruker setInterval() funkjsonen for at scoreFunc() og enemyUpdate() skal kjøres hvert sekund
    scoreCount = setInterval(scoreFunc,1000)   
    updateEnemy = setInterval(enemyUpdate, 1000);
 
    enemyEl.style.animation = "moveEnemy 1s linear infinite"
}
if(localStorage.mode == "hard"){ 
    //Bruker setTimeout() funksjonen for å innholdet skal kjøres et halvt sekund senere
    setTimeout(()=>{
    //bruker setInterval() funkjsonen for at scoreFunc() og enemyUpdate() skal kjøres hvert halve sekund
    scoreCount = setInterval(scoreFunc,500)  
    updateEnemy = setInterval(enemyUpdate,500) 
    },500)

    enemyEl.style.animation = "moveEnemy 0.5s linear infinite"
    
}

liveScoreEl.style.display = "block"

//Gir score en verdi -1 for å kompansere for at spillet kjøres et sekund i bakgrunnen før coundownEl forsvinner
let score = -1

//Lager en funksjon, scoreFunc(), som øker verien til score med 1
function scoreFunc(){
    score ++
    liveScoreEl.innerHTML = `Score: ${score}`
}


//Lager en setInterval() funksjon, updateHit, som kjører hvert tiende millisekund
updateHit = setInterval(()=>{
    //Henter inn informasjon om top verdien til enemyEl og gjør det om til datatypen number
    var enemyElTop = parseInt(window.getComputedStyle(enemyEl).getPropertyValue("top"));

    //Henter inn informasjon om top verdien til playerEl og gjør det om til datatypen number
    var playerElTop = parseInt(window.getComputedStyle(playerEl).getPropertyValue("top"));
    
    //Bruker en if test il å sjekke om enemyEl sin posisjon overlapper playerEl sin posisjon
    if(playerEl.style.right == enemyEl.style.right && playerElTop < (enemyElTop+130) && enemyElTop < 480){
    clearInterval(updateHit)
    clearInterval(updateEnemy)
    clearInterval(scoreCount)
    enemyEl.style.display = "none"
    document.querySelector('.endScreen').style.display = "flex"
    document.querySelector('.endScreenOverlay').style.display = "block"
    document.querySelector('.gameback').style.animation = "none"
    liveScoreEl.style.display = "none"
    scoreEl.innerHTML = ` ${score}`

}
},10)

}