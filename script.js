//  Click Box finder
let noBoxMarked = 0;
let columns = document.getElementsByTagName("td");

Array.from(columns).forEach(function (element) {
  if (noBoxMarked < 9) {
    element.addEventListener(
      "click",
      function (e) {
        // Only Box mark when box is blank and have id
        if (e.target.children.length == 0 && e.target.id != "") {
          // Check the no of Box checked
          if (noBoxMarked < 9) {
            noBoxMarked += 1;
            // Calling the Box mark
            mark(e.target.id);
          }
        }
      },
      { once: true }
    );
  }
});

//  Mark Code
function mark(id) {
  // Select the box with specific id
  let clickedBox = document.getElementById(id);
  if (clickedBox.children.length == "0") {
    if (turn == 0) {
      clickedBox.innerHTML = `<div class="circleDesign" style="border-color:red;background-color:red; "></div>`;
    } else {
      clickedBox.innerHTML = `<div class="circleDesign"  style="border-color:yellow;background-color:yellow; "></div>`;
    }
    playTurn(Number(id));
  }
}

// Player Turn
let firstPlayer = 0;
let secondPlayer = 1;
let firstPlayerSelect = [];
let secondPlayerSelect = [];
let turn = 0;
let turnText = document.querySelector(".playerTurn");

function playTurn(id) {
  if (turn == 0) {
    turn = 1;
    firstPlayerSelect.push(id);
    turnText.innerText = `Player Turn: Second Player`;
  } else {
    turn = 0;
    secondPlayerSelect.push(id);
    turnText.innerText = `Player Turn: First Player`;
  }
  winStatus();
}

// Win Status
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
let firstWinChance;
let secondWinChance;
const winMessage = document.querySelector("[data-message]");
function winStatus() {
  winCondition.forEach((winItem) => {
    firstWinChance = winItem.every((number) =>
      firstPlayerSelect.includes(number)
    );
    secondWinChance = winItem.every((number) =>
      secondPlayerSelect.includes(number)
    );
    if (firstWinChance === true) {
      winMessage.children[0].innerText = `First Wins!`;
      winMessage.style.display = "flex";
    } else if (secondWinChance === true) {
      winMessage.children[0].innerText = `Second Wins!`;
      winMessage.style.display = "flex";
    } else if (noBoxMarked == 9 && !firstWinChance && !secondWinChance) {
      winMessage.children[0].innerText = `Draw!`;
      winMessage.style.display = "flex";
    }
  });
}

// Restart Game
document.querySelector("[data-game-restart]").addEventListener("click", () => {
  winMessage.style.display = "none";
  firstPlayerSelect = [];
  secondPlayerSelect = [];
  firstWinChance = "";
  secondWinChance = "";
  noBoxMarked = 0;
  turn = 0;
  turnText.innerText = `Player Turn: First Player`;
  [...columns].forEach((element) => {
    element.innerHTML = "";
  });
});
