const grid = document.querySelector('.grid')
const resultDisplay = document.getElementById('result')
const score = document.getElementById('score')
const width = 15
let currentShooterIndex = -1
let invadersId
let dir = 1
let goingRight = true

for(let i=0; i< 225; i++){
    const square = document.createElement('div')
    square.innerHTML = i
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

for(let i=224; i>209; i--){
    squares[i].classList.add('occupied')
}


const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,36,38,39
]

function draw(){
    for(let i=0; i< alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.add('invader')
    }
}

function remove(){
    for(let i=0; i< alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

// squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
squares[currentShooterIndex].classList.remove('shooter')
switch(e.key){
    case 'ArrowLeft':
        if(currentShooterIndex % width !== 0) currentShooterIndex --
        break
    case 'ArrowRight':
        if(currentShooterIndex % width < width - 1) currentShooterIndex++
        break
}
squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if(rightEdge && goingRight){
        for(let i=0; i< alienInvaders.length; i++){
        alienInvaders[i] += width + 1
        dir = -1
        goingRight = false
        }
    }
    
    else if(leftEdge && !goingRight){
        for(let i=0; i< alienInvaders.length; i++){
        alienInvaders[i] += width - 1
        dir = 1
        goingRight = true
        }
    }

    for(let i=0; i< alienInvaders.length; i++){
    alienInvaders[i] += dir
    }
    draw()

    if(squares[currentShooterIndex].classList.contains('invader','occupied')){
        resultDisplay.innerHTML = 'GAME OVER !!'
        clearInterval(invadersId)
        document.removeEventListener('keydown', moveShooter)
    }  

}
invadersId = setInterval(moveInvaders, 100)

// function shoot(e){
//     let laserId 

// }