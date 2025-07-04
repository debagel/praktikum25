const plattform = document.getElementById("plattform")
let moveInterval = null;

if (plattform && !plattform.style.left) {
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
let brickRows = parseInt(localStorage.getItem("brickRows")) || 1;
const brickWidth = 9.8; 
const brickHeight = 5; 
const brickMargin = 0.2; 

if(document.body.classList.contains("game")) {
  // update score display
  updateScoreDisplay();

  // add bricks
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
}

let lastTime = 0
let batvx = 0
let batSpeed = 100

if(document.body.classList.contains("game")) {
  requestAnimationFrame(gameLoop);
}

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

// Beim Laden der Seite:
let ballvx = parseFloat(localStorage.getItem("ballvx")) || 40;
let ballvy = parseFloat(localStorage.getItem("ballvy")) || 40;

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
        lvlUp();
        setLives(); // Update lives display
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

        const blx1 = brickRect.left - 5
        const blx2 = brickRect.left + 5
        const brx1 = brickRect.right - 5
        const brx2 = brickRect.right + 5


        if (
            ball.bottomLeft.x >= brickRect.left &&
            ball.bottomLeft.x <= brickRect.right &&
            ball.bottomLeft.y <= brickTop &&
            ball.bottomLeft.y >= brickBottom
        ) {
              console.log("Any collision detected with brick!");
              if (ball.bottomLeft.x >= blx1 && ball.bottomLeft.x <= blx2 || ball.bottomLeft.x >= brx1 && ball.bottomLeft.x <= brx2) { 
                console.log("Collision detected with brick on the side!");
                ballvx = -ballvx; 
              } else {
                console.log("Collision detected with brick!");
                ballvy = -ballvy;
              }
             brick.remove(); // Remove the brick on collision
             updateScore(); // Update the score when a brick is hit
              
        }
    }
    
  }
    
    

  








// Beim Laden der Seite:
let currentLvl = parseInt(localStorage.getItem("currentLvl")) || 1;
const lvlElement = document.getElementById("lvl");
if(lvlElement) {
  lvlElement.innerHTML = currentLvl;
}

function win() {
  if (ball.bottomLeft.y >= borderHeight) {
    console.log("You won!");
    localStorage.setItem("lvlUp", "true");
    // Speichere das neue Level
    localStorage.setItem("currentLvl", currentLvl + 1);
    location.reload();
  }
}

// Beim Laden der Seite:
let scoreIncrement = parseInt(localStorage.getItem("scoreIncrement")) || 10;

// ... Rest deines Codes ...

function loose() {
  if (ball.bottomLeft.y <= 0) {
    console.log("You lost!");
    // Score, Level und Geschwindigkeit zurücksetzen
    
    looselives(); // Rufe die Funktion auf, um Leben zu verlieren
  }
}

function updateScore() {
  let score = parseInt(localStorage.getItem("score")) || 0;
  score += scoreIncrement; // Erhöhe den Score um den Score-Increment-Wert
  localStorage.setItem("score", score);
  updateScoreDisplay(); // Aktualisiere die Anzeige
}

function updateScoreDisplay() {
  const scoreElement = document.getElementById("scoreDisplay");
  scoreElement.innerHTML = parseInt(localStorage.getItem("score")) || 0; // Aktualisiere die Anzeige
}
  
 /* const yourScoreElement = document.getElementById("yourScore");
  yourScoreElement.innerText = score; // Update the score display on the lose page*/


function lvlUp() {
 
  if (localStorage.getItem("lvlUp") === "true") {
    localStorage.removeItem("lvlUp");
    // ... Score und Ballgeschwindigkeit erhöhen ...
    brickRows += 1;
    localStorage.setItem("brickRows", brickRows);
    // ... Rest wie gehabt ...
    localStorage.removeItem("lvlUp"); // Entferne den lvlUp-Status
  scoreIncrement = scoreIncrement + 10; // Erhöhe den Score-Increment-Wert um 10
  localStorage.getItem("ballvx") || 40; // Hole die aktuelle ballvx
  localStorage.getItem("ballvy") || 40; // Hole die aktuelle ballvy
  ballvx += 10; // Erhöhe die horizontale Geschwindigkeit um 10
  ballvy += 10; // Erhöhe die vertikale Geschwindigkeit um 10
  console.log("Level up! New ball speed:", ballvx, ballvy);
  localStorage.setItem("ballvx", ballvx);
  localStorage.setItem("ballvy", ballvy);
  localStorage.setItem("scoreIncrement", scoreIncrement); // Speichere den neuen Score
  score += scoreIncrement; // Erhöhe den Score um den Score-Increment-Wert
  console.log(currentLvl)
  }
 
}

let lives = parseInt(localStorage.getItem("lives")) || 3;

function looselives() {
  if (lives <= 1) {
    localStorage.setItem("score", 0);
    localStorage.setItem("currentLvl", 1);
    localStorage.setItem("ballvx", 40);
    localStorage.setItem("ballvy", 40);
    localStorage.removeItem("lvlUp");
    localStorage.setItem("scoreIncrement", 10); 
    localStorage.setItem("lives", 0);
    localStorage.setItem("brickRows", 1); // Reset brick rows to 1
    window.location.href = "lose.html";
  } else {
    lives -= 1;
    localStorage.setItem("lives", lives);
    console.log("Lives left:", lives);
    window.location.href = "gameplay.html"; 
  }
}


function setLives() {
  const livesElement = document.querySelector(".lives span");
  if (livesElement) {
    livesElement.innerText = localStorage.getItem("lives") || 3; 
  }
}