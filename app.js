const grid = document.querySelector('.grid')
const resultDisplay = document.getElementById('result')
const score = document.getElementById('score')
const width = 15
let currentShooterIndex = 202
let invadersId
let dir = 1
let goingRight = true
let aliensRemoved = []
let count = 0

// make the playground
for(let i=0; i< 225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'))

// set the bottom
for(let i=224; i>209; i--){
    squares[i].classList.add('occupied')
}

// alien invaders starting position
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,36,38,39
]
console.log(alienInvaders.length)
// draw and remove the alien invaders
function draw(){
    for(let i=0; i< alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)){
        squares[alienInvaders[i]].classList.add('invader')
        }
    }
}
function remove(){
    for(let i=0; i< alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

// shooter movement control
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

// move the alien invaders
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

    // movement of invaders
    for(let i=0; i< alienInvaders.length; i++){
    alienInvaders[i] += dir
    }
    draw()

    // invader crossed shooter
    for(let i=0; i< alienInvaders.length; i++){
        if(alienInvaders[i] >= 210 || squares[alienInvaders[i]].classList.contains('shooter','invader')){
            resultDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }
    console.log(alienInvaders.length)
    console.log(aliensRemoved.length)
    if(aliensRemoved.length === alienInvaders.length){
        resultDisplay.innerHTML = 'YOU WIN !!'
            clearInterval(invadersId)
    }
}
invadersId = setInterval(moveInvaders, 350)

// shoot-laser control
function shoot(e){
    let laserId 
    let currentLaserIndex = currentShooterIndex
    function moveLaser(){
        if(currentLaserIndex > 0){
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        }

        // laser hit invaders
        if(squares[currentLaserIndex].classList.contains('invader','laser')){
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom', 300))
        clearInterval(laserId)
        const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        count ++
        score.innerHTML = count
        }
    }
    switch(e.key){
        case 'ArrowUp':
        laserId = setInterval(moveLaser, 300)
    }
}
document.addEventListener('keyup',shoot)
