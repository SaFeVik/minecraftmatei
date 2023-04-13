// Henter elementer fra DOM
let ballEl = document.querySelector("#ball")
let player1El = document.querySelector("#player1")
let player2El = document.querySelector("#player2")
let score1El = document.querySelector("#score1")
let score2El = document.querySelector("#score2")
let gameSpaceEl = document.querySelector("#gameSpace")
let infoEl = document.querySelector("#info")
let infoH2El = document.querySelector("#info h2")
let modesBtn = document.querySelector("#modes")

modesBtn.onclick = () => {
    gameSpaceEl.classList.toggle('nether')
    player1El.classList.toggle('nether')
    player2El.classList.toggle('nether')
    ballEl.classList.toggle('nether')
    if(modesBtn.innerHTML == "Change to nether mode"){
        modesBtn.innerHTML = "Change to end mode"
    }else{
        modesBtn.innerHTML = "Change to nether mode"
    }
}
// Funksjon for å vente i koden
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Space for å starte spillet
document.addEventListener("keyup", spaceStart)
// Hvis tast er space, reset score og start spillet
function spaceStart(e){
    if(e.key == " "){
        scores = [0,0]
        score1El.innerHTML = scores[0]
        score2El.innerHTML = scores[1]
        start()
    }
}
// Starter spillet
function start(){
    // Fjerner mulighet for å starte spillet, og legger til mulighet for å flytte spillerne
    document.removeEventListener("keyup", spaceStart)
    document.addEventListener("keydown", movePlayers)
    // Fjerer info tekst
    infoEl.style.display = "none"
    // Plasserer ballen i midten
    ballX = 300
    ballY = 200
    ballEl.style.left = `${ballX}px`
    ballEl.style.top = `${ballY}px`
    // Setter default fart på ballen
    speed = 4
    // Lager vektoren for ballen som kan peke flere retninger
    vector[0] = Math.random() < 0.5 ? Math.random()*2+2 : -Math.random()*2-2
    vector[1] = Math.random() < 0.5  ? Math.abs(Math.sqrt((speed)**2 - vector[0]**2)) : -Math.abs(Math.sqrt((speed)**2 - vector[0]**2))
    // Starter ballbevegelsen
    intervalId = setInterval(ballMove, 10)
}

async function newGame(){
    // Plasserer spillerne i midten
    player1Y = 200
    player2Y = 200
    player1El.style.top = `${player1Y}px`
    player2El.style.top = `${player2Y}px`
    // Fjerner mulighet for å flytte spillerne, og legger til mulighet for å starte spillet
    document.addEventListener("keyup", spaceStart)
    document.removeEventListener("keydown", movePlayers)
    // Viser info tekst
    infoEl.style.display = "flex"
    // Fjerner ballbevegelsen
    clearInterval(intervalId)
}

// Deklarerer noen globale variabler
let scores = [0, 0]
let ballX
let ballY
let vector = []
let speed

function ballMove(){
    // Sjekker om ballen treffer en av spillerne
    if(ballX > 567.5 && ballX < 567.5+35 && ballY < player2Y+47.5 && ballY > player2Y-47.5){
        // Gir y koordinater ut ifra hvor ballen treffer spilleren
        vector[1] = (ballY-player2Y)/30*2
        // Gir x koordinater ut ifra y koordinatene og fart
        vector[0] = -Math.abs(Math.sqrt(speed**2 - vector[1]**2))
        // Øker farten hver gang ballen treffer en spiller
        speed += 0.1
    }else if(ballX < 85.5 && ballX > 85.5-35 && ballY < player1Y + 47.5 && ballY > player1Y-47.5){
        vector[1] = (ballY-player1Y)/30*2
        vector[0] = Math.abs(Math.sqrt(speed**2 - vector[1]**2))
        speed += 0.1
    }
    // Sjekker om ballen treffer en av sidene
    if(ballX > 640){
        // Fjerner ballbevegelsen, resetter ballen og øker scoren til spiller 1
        clearInterval(intervalId)
        start()
        scores[0]++
        // Hvis scoren er 5, resetter spillet og viser vinneren
        if(scores[0] == 5){
            newGame()
            infoH2El.innerHTML = "Player one Wins!<br>Press space to play again"
        }
        score1El.innerHTML = scores[0]
    }else if(ballX < 10){
        clearInterval(intervalId)
        start()
        scores[1]++
        if(scores[1] == 5){
            newGame()
            infoH2El.innerHTML = "Player two Wins!<br>Press space to play again"
        }
        score2El.innerHTML = scores[1]
    }
    // Legger til partikler bak ballen som blir plassert der ballen er og blir borte etter 1 sekund
    let particleEl = document.createElement("div")
    particleEl.classList.add("particle")
    particleEl.style.left = `${ballX}px`
    particleEl.style.top = `${ballY}px`
    gameSpaceEl.appendChild(particleEl)
    setTimeout(() => {
        particleEl.remove()
    }, 1000)

    // Hvis modus er nether, legger til nether partikler
    if(modesBtn.innerHTML == "Change to end mode"){
        particleEl.classList.add("nether")
    }
    // Hvis ballen treffer en vegg, spretter den tilbake
    if(ballY > 392.5){
        vector[1] = -Math.abs(vector[1])
    }else if(ballY < 7.5){
        vector[1] = Math.abs(vector[1])
    }

    // Flytter ballen
    ballX += vector[0]
    ballY += vector[1]
    ballEl.style.left = `${ballX}px`
    ballEl.style.top = `${ballY}px`
}

// Plasserer spillerne i midten
let player1Y = 200
let player2Y = 200
// Legger til eventlistener for å flytte spillerne
document.addEventListener("keydown", movePlayers)
document.addEventListener("keyup", unMovePlayers)
// Deklarerer noen globale variabler som brukes til å passe på at spillerne ikke beveger seg for fort
let player1Opp = false
let player1Ned = false
let player2Opp = false
let player2Ned = false
let kanTrykke1 = true
let kanTrykke2 = true
async function movePlayers(e){
    e.preventDefault();
    // Sjekker om spiller 1 skal bevege seg opp eller ned
    if(kanTrykke1 && (e.key == "w" || e.key == "s")){
        kanTrykke1 = false
        // While løkke som beveger spilleren opp eller ned med en while løkke. Baserer seg på variabler som endrer seg når taster blir trykket eller ikke
        if(e.key == "w"){
            player1Opp = true
            // Passer på at spilleren ikke går utenfor skjermen
            while(player1Opp && player1Y > 50){
                player1Y -= 7
                player1El.style.top = `${player1Y}px`
                await sleep(10)
            }
        }else if(e.key == "s"){
            player1Ned = true
            while(player1Ned && player1Y < 350){
                player1Y += 7
                player1El.style.top = `${player1Y}px`
                await sleep(10)
            }
        }
    }

    // Sjekker om spiller 2 skal bevege seg opp eller ned
    if(kanTrykke2 && (e.key == "ArrowUp" || e.key == "ArrowDown")){
        kanTrykke2 = false
        if(e.key == "ArrowUp"){
            player2Opp = true
            while(player2Opp && player2Y > 50){
                player2Y -= 7
                player2El.style.top = `${player2Y}px`
                await sleep(10)
            }
        }else if(e.key == "ArrowDown"){
            player2Ned = true
            while(player2Ned && player2Y < 350){
                player2Y += 7
                player2El.style.top = `${player2Y}px`
                await sleep(10)
            }
        }
    }
}

// Her endres variablene som brukes til å sjekke om spillerne skal bevege seg opp eller ned
function unMovePlayers(e){
    if(e.key == "w"){
        player1Opp = false
        kanTrykke1 = true
    }if(e.key == "s"){
        player1Ned = false
        kanTrykke1 = true
    }
    if(e.key == "ArrowUp"){
        player2Opp = false
        kanTrykke2 = true
    }if(e.key == "ArrowDown"){
        player2Ned = false
        kanTrykke2 = true
    }
}