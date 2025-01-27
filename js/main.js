//Gameboard object
const gameBoard = (function () {
    const gameboardContainer = document.querySelector('.gameboard-container');
    const gameBoardArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Create Players
    function createPlayer(name) {
        const playerMark = name;
        return { name, playerMark };
    }

    // Players
    const playerX = 'X';
    const playerY = 'Y';

    let playerTurn = playerX;

    //Board UI
    function displayBoard() {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square-container');

        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                // square.textContent = gameBoardArray[i][j];

                squareDiv.appendChild(square);
                gameboardContainer.appendChild(squareDiv);

                playerInput(square, i, j);
            }
        }
    }

    // Player Input Event
    function playerInput(targetItem, rowIndex, columnIndex) {
        targetItem.addEventListener('click', (e) => {

            // Input player's Mark on UI
            targetItem.textContent = playerTurn;

            // Push player's input in gameBoardArray
            gameBoardArray[rowIndex][columnIndex] = playerTurn;
            console.log({playerTurn});

            // Player's Turn
            changePlayerTurn();

            console.table(gameBoardArray);
        });
    }

    // Players Turn
    function changePlayerTurn() {
        if(playerTurn === playerX) {
            playerTurn = playerY;
        } else {
            playerTurn = playerX;
        }
    }

    // Win Logic
    function gameLogic() {

        //Horizontal
        if (gameBoardArray[0][0] === 'X' && gameBoardArray[0][1] === 'X' && gameBoardArray[0][2] === 'X' ||
            gameBoardArray[1][0] === 'X' && gameBoardArray[1][1] === 'X' && gameBoardArray[1][2] === 'X' ||
            gameBoardArray[2][0] === 'X' && gameBoardArray[2][1] === 'X' && gameBoardArray[2][2] === 'X' ||

            // Vertical
            gameBoardArray[0][0] === 'X' && gameBoardArray[1][0] === 'X' && gameBoardArray[2][0] === 'X' ||
            gameBoardArray[0][1] === 'X' && gameBoardArray[1][1] === 'X' && gameBoardArray[2][1] === 'X' ||
            gameBoardArray[0][2] === 'X' && gameBoardArray[1][2] === 'X' && gameBoardArray[2][2] === 'X' ||

            // Diagonal
            gameBoardArray[0][0] === 'X' && gameBoardArray[1][1] === 'X' && gameBoardArray[2][2] === 'X' ||
            gameBoardArray[0][2] === 'X' && gameBoardArray[1][2] === 'X' && gameBoardArray[2][0] === 'X'
        ) {
            console.log('Player won!');
        } else {
            console.log('player lost!');
        }
    }

    // Click on board
    // function boardInput() {
    //     console.log(square);
    // }

    displayBoard();
    gameLogic();
    createPlayer();

    // return { gameboardContainer, gameBoardArray, displayBoard, gameLogic };
})();