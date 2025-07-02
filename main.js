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


const bricksPerRow = 10;
const brickRows = 6;
const brickWidth = 9.8; 
const brickHeight = 5; 
const brickMargin = 0.2; 

for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < bricksPerRow; col++) {
        const brick = document.createElement("div");
        brick.className = "brick";
        brick.style.left = `${col * (brickWidth + brickMargin)}%`;
        brick.style.bottom = `${80 - row * (brickHeight + brickMargin)}%`;
        document.getElementById("blockSpace").appendChild(brick);
        brick.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; 
        brick.style.width = brickWidth + "%";
        brick.style.height = brickHeight + "%";
        brick.style.position = "absolute";
        brick.style.border = "1px solid black";
        brick.style.boxSizing = "border-box";
        brick.style.zIndex = "1"; 
        brick.style.margin = "0";
    }
}

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
        //console.log("Game loop running at time:", time)
    }
}

let ball = {
    bottomLeft: { x: 1000, y: 500 }, 
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
        win();
        loose();
        brickCollision()
        //console.log(ballRect.bottom, plattformRect.top)
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

    
}



function checkCollision() {
    plattformRect = plattform.getBoundingClientRect()
   
    //console.log(plattformRect)
    //ballRect = ballElement.getBoundingClientRect()
    plattformTop = borderHeight - plattformRect.top;
    plattformBottom = borderHeight - plattformRect.bottom;
    //console.log(plattformTop, plattformBottom, ball.bottomLeft.y);

    if(ball.bottomLeft.x >= plattformRect.left && ball.bottomLeft.x <= plattformRect.right && ball.bottomLeft.y <= plattformTop && ball.bottomLeft.y >= plattformBottom) {
        // Collision detected
        console.log("Collision detected!");
        ballvy = -ballvy; // Reverse the vertical velocity
    }

    // if (ballRect.bottom === plattformRect.top) {
    //   console.log("Collision detected!");
    // }


}

function brickCollision() {
    const bricks = document.querySelectorAll(".brick");
    for (const brick of bricks) {
        const brickRect = brick.getBoundingClientRect();
        const brickTop = borderHeight - brickRect.top;
        const brickBottom = borderHeight - brickRect.bottom;

        if (
            ball.bottomLeft.x >= brickRect.left &&
            ball.bottomLeft.x <= brickRect.right &&
            ball.bottomLeft.y <= brickTop &&
            ball.bottomLeft.y >= brickBottom
        ) {
            // Collision detected
            console.log("Collision detected!");

            /*if(hitSide(brick)) {
              ballvx = -ballvx; // Richtung umkehren
            } else {
              ballvy = -ballvy; // Richtung umkehren
            }  */
           ballvy = -ballvy; 
            brick.remove();    // Brick entfernen
            break;            // Nur einen Brick pro Frame entfernen
        }
    }
}
//console.log(ballRect.bottom, plattformRect.top)

function hitSide(b) {
  const ballRect = ballElement.getBoundingClientRect();
  const bLeft = b.getBoundingClientRect().left;
  const bRight = b.getBoundingClientRect().right;
  
  // Check if the ball is hitting the left or right side of the brick
  if (ballRect.right >= bLeft && ballRect.left <= bRight) {
    return true; // Hit side
  }
  
  return false; // Hit top or bottom
}



function loose() {
  if (ball.bottomLeft.y <= 0) {
    console.log("You lost!");
    window.location.href = "lose.html"; 
    
  }
}

function win() {
  if (ball.bottomLeft.y >= borderHeight) {
    console.log("You won!");
    
  }
}