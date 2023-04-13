let calculateEl = document.querySelector('#calculate')
let x1El = document.querySelector('#x1')
let y1El = document.querySelector('#y1')
let x2El = document.querySelector('#x2')
let y2El = document.querySelector('#y2')

let pilEl = document.querySelector('.pil')

let portal2El = document.querySelector('#portal2')
let lengdeEl = document.querySelector('#lengde')
let degreesEl = document.querySelector('#degrees')

let blocksEl = document.querySelector('#blocks')
let blocksAnswerEl = document.querySelector('#blocks_answer')

let titleNOEl = document.querySelector('#title_n_o')
let xOverEl = document.querySelector('#x_over')
let yOverEl = document.querySelector('#y_over')
let xNetherEl = document.querySelector('#x_nether')
let yNetherEl = document.querySelector('#y_nether')

let nOCalculateBtn = document.querySelector('#n_o_calculate')
let changeEl = document.querySelector('#change')
let netherOver = document.querySelector('.nether_over')


calculateEl.addEventListener('click', map)
blocksEl.addEventListener('keyup', blocks)
nOCalculateBtn.addEventListener('click', nO)
changeEl.addEventListener('click', change)

let order = true
function change(){
    if(order == true){
        netherOver.style.flexDirection = "column-reverse"
        titleNOEl.innerHTML = "Nether to overworld"
    }else{
        netherOver.style.flexDirection = "column"
        titleNOEl.innerHTML = "Overworld to nether"
    }
    order = !order
}

function nO(){
    if(order == true){
        xNetherEl.value = Math.round(xOverEl.value / 8)
        yNetherEl.value = Math.round(yOverEl.value / 8)
    }else{
        xOverEl.value = Math.round(xNetherEl.value * 8)
        yOverEl.value = Math.round(yNetherEl.value * 8)
    }
}
function blocks(){
    let antall = vAB_L/(Number(blocksEl.value) + 1)
    console.log("vAB_L", vAB_L)
    if(vAB_L === undefined || vAB_L === 0){
        blocksAnswerEl.innerHTML = `You need the coordinates first!`
    }else{
        blocksAnswerEl.innerHTML = `Blocks needed: ${Math.round(antall)}`
    }
}

let vAB_L

function map(){
    console.log("click")

    let x1 = x1El.value
    let y1 = y1El.value
    let x2 = x2El.value
    let y2 = y2El.value

    let vO = [0,1]
    let vAB = []
    
    vAB.push(x2-x1)
    vAB.push(y2-y1)
    
    let vO_L = 1
    vAB_L = ((x2-x1)**2 + (y2-y1)**2)**(1/2)
    
    
    let cos = (vAB[0]*vO[0] + vAB[1]*vO[1])/(vO_L*vAB_L)
    
    let vinkel = Math.acos(cos)
    let grader = (vinkel/Math.PI) * 180
    
    if(vAB[0] > 0){
        grader = grader*(-1)
    }

    if(grader<0){
        pilEl.style.transform = `rotate(${Math.abs(grader)}deg)`
        portal2El.style.transform = `rotate(${grader}deg)`

        lengdeEl.style.transform = "rotate(0deg)"
        lengdeEl.style.left = "40px"

    }else{
        pilEl.style.transform = `rotate(${(-1)*grader}deg)`
        portal2El.style.transform = `rotate(${grader}deg)`

        lengdeEl.style.transform = "rotate(180deg)"
        lengdeEl.style.left = "70px"
    }

    lengdeEl.innerHTML = `${Math.round(vAB_L)}m`
    if(grader <= 0 || grader > 0){
        degreesEl.innerHTML = `${Math.round(grader*10)/10} degrees`
    }

    console.log("grader:", grader)
}
