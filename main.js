const plattform = document.getElementById("plattform")
let moveInterval = null;

if (!plattform.style.left) {
  plattform.style.left = "47%"
}

function moveLeft() {
  let plattformPos = plattform.style.left;
  let numPos = parseInt(plattformPos) || 0
  let updatedPos = (numPos - 1) + "%"; 
  if (updatedPos < "0%") {
    updatedPos = "0%"; 
  }
  plattform.style.left = updatedPos;
  
}

function moveRight() {
  let plattformPos = plattform.style.left;
  let numPos = parseInt(plattformPos) || 0
  let newNumPos = numPos + 1
  if (newNumPos > 93) {
    newNumPos = 93;
  }
  let updatedPos = newNumPos + "%";
  plattform.style.left = updatedPos;
}
window.addEventListener("keydown", (e) => {
  if (e.key === 'a' && !moveInterval) {
    moveInterval = setInterval(moveLeft, 20)
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === 'a' && moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === 'd' && !moveInterval) {
    moveInterval = setInterval(moveRight, 20)
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === 'd' && moveInterval) {
    clearInterval(moveInterval)
    moveInterval = null;
  }
});



let lastTime = 0
let batvx = 0
let batSpeed = 100

requestAnimationFrame(gameLoop)

function gameLoop(time) {
    if(time) {
        const deltams = time - lastTime
       // moveBat(deltams)
        //lastTime = time
        requestAnimationFrame(gameLoop)
        console.log("Game loop running at time:", time)
    }
}

let ball = {
    bottomLeft: { x: 1000, y: 100 }, 
    setX(newX) { this.bottomLeft.x = newX; },
    setY(newY) { this.bottomLeft.y = newY; }
};
const ballElement = document.getElementById("ball")

let ballvx = 40
let ballvy = 40

function gameLoop(time) {
    if(time) {
        wallBounce();
        checkCollision();
        console.log(ballRect.bottom, plattformRect.top)
        const deltams = time - lastTime
        moveBall(deltams)
        //moveBat(deltams)
        lastTime = time
        requestAnimationFrame(gameLoop)
    }
}

function moveBall(deltams) {
    const dx = ballvx / deltams
    const dy = ballvy / deltams
    ball.setX(ball.bottomLeft.x + dx)
    ball.setY(ball.bottomLeft.y + dy)
    
    ballElement.style.left = ball.bottomLeft.x + 'px'
    ballElement.style.bottom = ball.bottomLeft.y + 'px'
}

const border = document.getElementById("border");
const borderWidth = window.innerWidth
const borderHeight = window.innerHeight


function wallBounce() {
    if (ball.bottomLeft.x + ballElement.offsetWidth >= borderWidth || ball.bottomLeft.x <= 0) {
        ballvx = ballvx * -1; 
    }

    if (ball.bottomLeft.y + ballElement.offsetHeight >= borderHeight || ball.bottomLeft.y <= 0) {
        ballvy = ballvy * -1; 
    }
}



function checkCollision() {
    plattformRect = plattform.getBoundingClientRect()
    ballRect = ballElement.getBoundingClientRect()

    if (ballRect.bottom === plattformRect.top) {
      console.log("Collision detected!");
    }
}


console.log(ballRect.bottom, plattformRect.top)