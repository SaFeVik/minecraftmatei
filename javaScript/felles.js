let hamburger = document.querySelector('.burger')

hamburger.onclick = function(){
    document.querySelector('.websites').classList.toggle('show')
    hamburger.classList.toggle('show')
}
let pulseEl = document.querySelector('#pulse')
const sentences = [
    "The End?",
    "1% sugar!",
    "Awesome!",
    "100% pure!",
    "It's here!",
    "Excitement!",
    "Indev!",
    "Uses LWJGL!",
    "Minecraft!",
    "Yaaay!",
    "Ingots!",
    "L33t!",
    "Create!",
    "Survive!",
    "Dungeon!",
    "Exclusive!",
    "Classy!",
    "Wow!",
    "Oh man!",
    "Pixels!",
    "Teetsuuooo!",
    "Kaaneedaaa!",
    "Enhanced!",
    "Pretty!",
    "Fat free!",
    "Free dental!",
    "Indie!",
    "GOTY!",
    "Euclidian!",
    "Now in 3D!",
    "Herregud!",
    "Yes, sir!",
    "OpenGL 1.2!",
    "Try it!",
    "Sensational!",
    "Guaranteed!",
    "Macroscopic!",
    "Bring it on!",
    "Freaky!",
    "Water proof!",
    "Whoa, dude!",
    "Notch <3 ez!",
    "Haunted!",
    "Polynomial!",
    "Terrestrial!",
    "Scientific!",
    "Not linear!",
    "Syne"
]
let date = new Date()
let currentMonth = date.getMonth()
let currentDate = date.getDate()
let dagIAret = Math.floor((currentDate + currentMonth * 30)/8)
pulseEl.innerHTML = sentences[dagIAret]