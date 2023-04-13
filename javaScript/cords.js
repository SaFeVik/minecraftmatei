// Henter nødvendige elementer fra DOM
let nameCordEl = document.querySelector('#nameCord')
let xCordEl = document.querySelector('#xCord')
let yCordEl = document.querySelector('#yCord')
let newBtn = document.querySelector('#new')
let newContainerEl = document.querySelector('#newContainer')

// newCord() spilles av når klikk på newBtn
newBtn.addEventListener('click', newCord)

// newCord() spilles av når klikk på enter
document.addEventListener('keyup', enter)
function enter(e){
    if (e.key == 'Enter'){
        newCord()
    }
}

// Hvis aldri har vært på nettsiden, lag localStorage.mineCords som tomt array
if(!localStorage.mineCords){
    localStorage.mineCords = JSON.stringify([])
}

let boxNr = 0
// Pakker ut localStorage info til et array
let cordInfo = JSON.parse(localStorage.mineCords) 

// Hvis cordInfo.length er større enn 0, lag tutorialBoxes ut ifra cordInfo arrayet
if(cordInfo.length >0){
    for(let i=0; i<cordInfo.length; i++){
        boxNr += 1
        newContainerEl.innerHTML += `
        <div class="newCord">
            <div class="number">#${boxNr}</div>
            <div class="newName">
                ${cordInfo[i].navn}
            </div>
            <div class="newX">
                ${cordInfo[i].x}
            </div>
            <div class="newY">
                ${cordInfo[i].y}
            </div>
            <div class="delete"></div>
        </div>
        `
    }

    // Legger til animasjon og delete event til boksene som har blitt laget
    animationDelete()
}


// Lager en ny koordinatboks
function newCord(){
    // Øker antall bokser med 1
    boxNr += 1

    // Konstruerer ny boks
    newContainerEl.innerHTML += `
        <div class="newCord">
            <div class="number">#${boxNr}</div>
            <div class="newName">
                ${nameCordEl.value}
            </div>
            <div class="newX">
                ${xCordEl.value}
            </div>
            <div class="newY">
                ${yCordEl.value}
            </div>
            <div class="delete"></div>
        </div>
    `

    // Legger til objekt fra ny boks i cordInfo arrayet
    cordInfo.push({
        navn: nameCordEl.value,
        x: xCordEl.value,
        y: yCordEl.value
    })

    // Tømmer inputfeltene
    nameCordEl.value = ""
    xCordEl.value = ""
    yCordEl.value = ""


    // Ta bort evnen til å lage ny boks rett etterpå
    newBtn.removeEventListener('click', newCord)
    document.removeEventListener('keyup', enter)

    // Legger til animasjon og delete event til boksen som har blitt laget
    animationDelete()

    // Lagrer informasjonen om boksene i localStorage
    localStorage.mineCords = JSON.stringify(cordInfo)
}

function animationDelete(){
    // Henter inn alle cordboksene
    let newCordEls = document.querySelectorAll('.newCord')

    // Legger til klassen "animatedNew" til alle cordboksene untatt den nyeste og tar den bort etter animasjonen er ferdig
    for(let k=newCordEls.length-2; k>=0; k--){
        newCordEls[k].classList.add('animatedNew');
        setTimeout(function() {
            newCordEls[k].classList.remove('animatedNew');
        }, 300);
    }
    // Kan ikke lage ny boks før animasjonen er ferdig
    setTimeout(function() {
        newBtn.addEventListener('click', newCord)
        document.addEventListener('keyup', enter)
    }, 300);

    // Legger til klassen "animatedLast" til nyeste cordboksen og tar den bort etter animasjonen er ferdig
    newCordEls[newCordEls.length-1].classList.add('animatedLast');
    setTimeout(function() {
        newCordEls[newCordEls.length-1].classList.remove('animatedLast');
    }, 300);

    // Henter inn alle delete knappene
    let deleteEls = document.querySelectorAll(".delete")

    // Itererer gjennom alle delete knappene og legger til onclick funksjon
    for(let i=deleteEls.length-1; i>=0; i--){
        deleteEls[i].onclick = function(){

            // Henter inn alle cordboksene når man har klikket på slett
            let newCordEls = document.querySelectorAll('.newCord')

            // Holder styr på om man er før eller etter boksen som er trykket på når man er i for løkken
            let passert = false

            // Itererer gjennom delete knappene og legger til klassen "animatedDelete" på alle som ligger foran den man har trykket på, og tar den bort etter animasjonen er ferdig
            for(let k=newCordEls.length-1; k>=0; k--){
                if(newCordEls[k+1] == this.parentNode){
                    passert = true
                }
                if(passert){
                    newCordEls[k].classList.add('animatedDelete');
                    setTimeout(function() {
                        newCordEls[k].classList.remove('animatedDelete');
                    }, 300);
                }
            }

            // Sletter cordBoksen til delete knappen man har trykket på
            this.parentNode.remove()

            // Ta bort boksinformasjonen til den som er slettet
            cordInfo.splice(i, 1)

            // Henter inn cordboksene igjen
            newCordEls = document.querySelectorAll('.newCord')

            // Itererer gjennom alle cordboksene og gir dem passende nummmer etter slettingen
            let numberEls = document.querySelectorAll(`.number`)
            for(let j=0 ; j<newCordEls.length; j++){
                numberEls[j].innerHTML = `#${j+1}`
            }

            // Minker antall bokser med 1
            boxNr -= 1

            // Lagrer informasjonen om boksene i localStorage
            localStorage.mineCords = JSON.stringify(cordInfo)
        }
    }
}
