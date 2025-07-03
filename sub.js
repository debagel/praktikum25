function highscore() {
  let currentHighscore = localStorage.setItem("highscore") || 0;
  currentHighscore = score;
  if (score > currentHighscore) {
    localStorage.setItem("highscore", score);
    console.log("New highscore:", score);
    if (document.body.classList.contains("mainMenu")) {
      const highscoreElement = document.getElementById("highscore");
      highscoreElement.innerHTML = currentHighscore;
      }
    }
  }
