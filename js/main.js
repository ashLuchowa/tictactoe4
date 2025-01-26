//Gameboard object
const gameBoard = (function () {
    const gameboardContainer = document.querySelector('.gameboard-container');

    const gameBoardArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    //Board UI
    function displayBoard() {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square-container');

        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.textContent = gameBoardArray[i][j];

                squareDiv.appendChild(square);
                gameboardContainer.appendChild(squareDiv);
            }
        }
    }

    // Player input
    gameBoardArray[0][0] = 'X';
    gameBoardArray[1][0] = 'X';
    gameBoardArray[2][0] = 'X';

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

    displayBoard();
    gameLogic();

    // return { gameboardContainer, gameBoardArray, displayBoard, gameLogic };
})();