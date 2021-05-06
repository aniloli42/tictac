//  Click Box finder
let noBoxMarked = 0;
let columns = document.getElementsByTagName('td');
Array.from(columns).forEach(function (element) {
    if (noBoxMarked < 9) {
        element.addEventListener('click', function (e) {
            // Only Box mark when box is blank and have id
            if (e.target.children.length == 0 && e.target.id != '') {
                // Check the no of Box checked
                if (noBoxMarked < 9) {
                    noBoxMarked += 1;
                    // Calling the Box mark
                    mark(e.target.id);
                }
            }
        });
    }
});

//  Mark Code
function mark(id) {
    // Select the box with specific id
    let clickedBox = document.getElementById(id);
    if (clickedBox.children.length == '0') {
        if (turn == 0) {
            clickedBox.innerHTML = `<div class="circleDesign" style="border-color:red;background-color:red; "></div>`;
        } else {
            clickedBox.innerHTML = `<div class="circleDesign"  style="border-color:yellow;background-color:yellow; "></div>`;
        }
        playTurn(id);
    }

}

// Player Turn 
let firstPlayer = 0;
let secondPlayer = 1;
let firstPlayerSelect = [];
let secondPlayerSelect = [];
let turn = 0;
let turnText = document.querySelector('.playerTurn');

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
    if (noBoxMarked > 2) {
        winStatus();
    }
}

// Win Status
function winStatus() {
    let arr1 = firstPlayerSelect;
    let arr2 = secondPlayerSelect;
    let arr = {
        0: [0, 1, 2],
        1: [3, 4, 5],
        2: [6, 7, 8],
        3: [0, 3, 6],
        4: [1, 4, 7],
        5: [2, 5, 8],
        6: [0, 4, 8],
        7: [2, 4, 6]
    }
    console.log(arr1,arr2);
    for (let i = 0; i < Object.keys(arr).length; i++) {
        let val1 = arr1.filter(item => arr[i].includes(item));
        let val2 =arr2.filter(item=>arr[i].includes(item));
        console.log(val1, val2);
        if (val1.length == 3 || val2.length ==3) {
            // Checking the 
            console.log('suc');
            break;
        }else{
            console.log('f');
        }
    }
}