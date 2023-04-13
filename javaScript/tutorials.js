let tutContainerEl = document.querySelector('#tutContainer')
let searchEl = document.querySelector('#search')


// Henter tutorial informasjon
fetch("../json/yt_videoer.json")
    .then(res => res.json())
    .then(dataArr => {

        // Sorterer tutorialinformasjonen alfabetisk
        dataArr.sort(function (a, b) {
            if (a.tittel < b.tittel) {
              return -1;
            }
            if (a.tittel > b.tittel) {
              return 1;
            }
            return 0;
        })

        // Legger til alle tutorialboksene fra informasjonen i yt_videoer.json
        for(let i=0; i<dataArr.length; i++){

            // Farm = aktuelle tutorial objekt
            let farm = dataArr[i]

            // Deklarerer tom aboutseksjon
            let about = ""

            // Legger til informasjon i aboutseksjonen
            for(let i=0; i<farm.about.length; i++){
                about += `<p>${farm.about[i]}</p>`
            }

            // Konstruerer tutorialBoxene
            tutContainerEl.innerHTML += `
            <div class="tutorialBox">
                <div class="check"></div>
                    <a target="_blank" href="${farm.link}">
                        <div class="tutorial" style="background: rgba(255, 255, 255, .1) url('../bilder/videoer/${farm.bilde}') center no-repeat;background-size:130px">
                        <h3>${farm.tittel}</h3>
                        </div>
                    </a> 
                <div class="aboutKnapp">About</div>
                <div class="about">
                ${about}
                </div>
            </div>
            `
        }

        let checkMarks = document.querySelectorAll('.check')

        // Hvis første gang på nettsiden, fyll localStorage.mineChecks med false alik at alle checkboxene er unchecked
        if(!localStorage.mineChecks){
            let checker = []
            for(let i = 0; i < checkMarks.length; i++){
                checker.push(false)
            }
            localStorage.mineChecks = JSON.stringify(checker)
        }
        // Pakker ut localStorage info til et array
        let utpakkedeChecker = JSON.parse(localStorage.mineChecks)  

        if(utpakkedeChecker.length < checkMarks.length){
            for(let i = utpakkedeChecker.length; i < checkMarks.length; i++){
                utpakkedeChecker.push(false)
            }
        }else if(utpakkedeChecker.length > checkMarks.length){
            for(let i = checkMarks.length; i <= utpakkedeChecker.length+1; i++){
                utpakkedeChecker.pop()
            }
        }
            
        // Checker av checkboxer som har blitt klikket på og som blir klikket på
        for(let i = 0; i < checkMarks.length; i++){

            // Hvis trykket på fra før, gjør den checked
            if(utpakkedeChecker[i] == true){
                checkMarks[i].classList.add('checked')
            }
            
            // Hvis ikke trykket på fra før, ikke gjør den checked
            else{
                checkMarks[i].classList.remove('checked')
            }
            checkMarks[i].addEventListener('click', function(){

                // Hvis ikke trykket på fra, gjør checked
                if(utpakkedeChecker[i] == false){
                    checkMarks[i].classList.add('checked')
                    utpakkedeChecker[i] = true
                // Hvis trykket på fra før, fjern checked
                }else{
                    checkMarks[i].classList.remove('checked')
                    utpakkedeChecker[i] = false
                }
                // Oppdaterer localStorage
                localStorage.mineChecks = JSON.stringify(utpakkedeChecker)
            })
        }

        // Henter ut alle aboutKnappene og alle aboutseksjonene
        let aboutKnappBtns = document.querySelectorAll('.aboutKnapp')
        let aboutEls = document.querySelectorAll('.about')
        // Når du trykker på en aboutKnapp, får tilhørende aboutseksjonen klassen show
        for(let i=0; i<aboutKnappBtns.length; i++){
            aboutKnappBtns[i].addEventListener('click', function() {
                aboutEls[i].classList.toggle('show')
            })
        }

        // Henter ut alle tutorialBoxene
        let tutorialBoxEls = document.querySelectorAll('.tutorialBox')

        // Når du skriver i søkefeltet, filtrerer den ut tutorialBoxene som ikke matcher søket
        searchEl.addEventListener('input', e => {
            // Lager en variabel som inneholder det som er skrevet i søkefeltet
            let value = e.target.value.toLowerCase()
            // Går gjennom alle tutorialBoxene og sjekker om tittelen inneholder det som er skrevet i søkefeltet
            for(let i = 0; i < dataArr.length; i++){
                // Hvis tittelen ikke inneholder det som er skrevet i søkefeltet, legg til klassen hide
                let isVisible = dataArr[i].tittel.toLowerCase().includes(value)
                if(!isVisible){
                    tutorialBoxEls[i].classList.add('hide')
                }else{
                    tutorialBoxEls[i].classList.remove('hide')
                }
                
            }

        })
})

