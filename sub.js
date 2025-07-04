/*function highscore() {
  let currentHighscore = 0;
  localStorage.setItem("highscore", 0); 
  currentHighscore = parseInt(localStorage.getItem("highscore")) || 0; 
  if (currentHighscore < score) {
  currentHighscore = score;
  }
  if (score > currentHighscore) {
    localStorage.setItem("highscore", score);
    console.log("New highscore:", score);
    if (document.body.classList.contains("mainMenu")) {
      const highscoreElement = document.getElementById("highscore");
      highscoreElement.innerHTML = currentHighscore;
      }
    }
    console.log("Current highscore:", currentHighscore);
  }


  let lastTime = 0
let batvx = 0
let batSpeed = 100


  requestAnimationFrame(gameLoop);


function gameLoop(time) {
    if(time) {
        const deltams = time - lastTime
       // moveBat(deltams)
        //lastTime = time
        requestAnimationFrame(gameLoop)
        //console.log("Game loop running at time:", time)
        highscore();
    }
}
*/