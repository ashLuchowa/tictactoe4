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

    return { gameboardContainer, gameBoardArray, displayBoard };
})();

gameBoard.displayBoard();