//Gameboard object
const gameBoard = (function () {
    const gameboardContainer = document.querySelector('.gameboard-container');
    const gameBoardArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Create Players
    function createPlayer(userMarker) {
        let userScore = 0;
        const getScore = () => userScore;
        const giveScore = () => userScore++;
        return {userMarker, giveScore, getScore};
    }

    // Players
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');

    let playerTurn = playerX;

    //Board UI
    function displayBoard() {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square-container');

        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                const square = document.createElement('div');
                square.classList.add('square');

                squareDiv.appendChild(square);
                gameboardContainer.appendChild(squareDiv);

                playerInput(square, i, j);
            }
        }
    }

    // Player Input Event
    function playerInput(targetItem, rowIndex, columnIndex) {
        targetItem.addEventListener('click', () => {

            if (!targetItem.textContent) {
                // Input player's Mark on UI
                targetItem.textContent = playerTurn.userMarker;

                // Push player's input in gameBoardArray
                gameBoardArray[rowIndex][columnIndex] = playerTurn;
            } else {
                return targetItem.textContent;
            }

            // Display win UI
            gameLogic();

            // Change player's turn
            changePlayerTurn();

            console.table(gameBoardArray);
        });
    }

    // Players Turn
    function changePlayerTurn() {
        if (playerTurn === playerX) {
            wonPlayer = playerX;
            displayPlayer = playerX.userMarker;
            playerTurn = playerO;
        } else {
            wonPlayer = playerO;
            displayPlayer = playerO.userMarker;
            playerTurn = playerX;
        }
    }

    // Win Logic
    function gameLogic() {

        //Horizontal
        if (gameBoardArray[0][0] === playerTurn && gameBoardArray[0][1] === playerTurn && gameBoardArray[0][2] === playerTurn ||
            gameBoardArray[1][0] === playerTurn && gameBoardArray[1][1] === playerTurn && gameBoardArray[1][2] === playerTurn ||
            gameBoardArray[2][0] === playerTurn && gameBoardArray[2][1] === playerTurn && gameBoardArray[2][2] === playerTurn ||

            // Vertical
            gameBoardArray[0][0] === playerTurn && gameBoardArray[1][0] === playerTurn && gameBoardArray[2][0] === playerTurn ||
            gameBoardArray[0][1] === playerTurn && gameBoardArray[1][1] === playerTurn && gameBoardArray[2][1] === playerTurn ||
            gameBoardArray[0][2] === playerTurn && gameBoardArray[1][2] === playerTurn && gameBoardArray[2][2] === playerTurn ||

            // Diagonal
            gameBoardArray[0][0] === playerTurn && gameBoardArray[1][1] === playerTurn && gameBoardArray[2][2] === playerTurn ||
            gameBoardArray[0][2] === playerTurn && gameBoardArray[1][2] === playerTurn && gameBoardArray[2][0] === playerTurn
        ) {
            setTimeout(winUI, 250);
        }
    }

    // Win Function
    function winUI() {
        let winResult = confirm(`Player ${displayPlayer} has won! Continue?`);
        if(winResult === true) {
            wonPlayer.giveScore();
            resetBoard();
            console.log(playerX.getScore());
            console.log(playerO.getScore());
        } else {
            resetBoard();
        }
        console.table(gameBoardArray);
    }

    // Reset Function
    function resetBoard() {
        for(let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                // Reset Array
                gameBoardArray[i][j] = '';

                //Reset UI
                const squares = document.querySelectorAll('.square');
                squares.forEach(square => {
                    square.textContent = '';
                });
            }
        }
    }

    displayBoard();
    createPlayer();

    return { gameboardContainer, gameBoardArray, displayBoard, gameLogic, playerX, playerO };
})();