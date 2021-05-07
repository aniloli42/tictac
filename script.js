let columns = document.getElementsByTagName("td");
let selectCurrentClass = "redMark";
let turn = 0;
let turnText = document.querySelector(".playerTurn");

// Click Box Finder
Array.from(columns).forEach((element) => {
  element.addEventListener("mouseup", (e) => {});
  element.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("redMark") == false &&
      e.target.classList.contains("yellowMark") == false
    ) {
    let cell = e.target;
    mark(cell, selectCurrentClass);
    if (winStatus(selectCurrentClass)) {
      showWinMessage(false);
    } else if (checkDraw()) {
      showWinMessage(true);
    } else {
      playTurn();
    }
    }
  });
});

//  Mark Code
function mark(cell, selectCurrentClass) {
    cell.classList.add(selectCurrentClass);
}

// Player Turn
function playTurn() {
  turn = !turn;
  selectCurrentClass = turn == 0 ? "redMark" : "yellowMark";
  turnText.innerText =
    turn == 0 ? "Player Turn: First Player" : "Player Turn: Second Player";
}

// Win Check
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function winStatus(selectCurrentClass) {
  return winCondition.some((winCombination) => {
    return winCombination.every((number) => {
      return columns[number].classList.contains(selectCurrentClass);
    });
  });
}

// Check Draw

function checkDraw() {
  return [...columns].every((element) => {
    return (
      element.classList.contains("redMark") ||
      element.classList.contains("yellowMark")
    );
  });
}

// Win Show
const winMessage = document.querySelector("[data-message]");
function showWinMessage(draw) {
  if (draw) {
    winMessage.children[0].innerText = `Draw!`;
    winMessage.style.display = "flex";
  } else {
    winMessage.children[0].innerText = `${
      selectCurrentClass == "redMark" ? "Red Wins" : "Yellow Wins"
    }`;
    winMessage.style.display = "flex";
  }
}

// Restart Game
document.querySelector("[data-game-restart]").addEventListener("click", () => {
  winMessage.style.display = "none";
  turn = 0;
  selectCurrentClass = "redMark";
  turnText.innerText = `Player Turn: First Player`;
  [...columns].forEach((element) => {
    element.className = "";
  });
});
