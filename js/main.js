//Gameboard object
const gameBoard = (function () {
    const gameboardContainer = document.querySelector('.gameboard-container');
    const gameBoardArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let gameRound = 1;

    // Create Players
    function createPlayer(userMarker) {
        let userScore = 0;
        const getScore = () => userScore;
        const giveScore = () => userScore++;
        return { userScore, userMarker, giveScore, getScore };
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

    // Display the scores, player names and logo
    function scoreInterface() {
        // Game logo
        const gameLogo = document.createElement('div');
        gameLogo.classList.add('game-logo');
        gameboardContainer.appendChild(gameLogo);
        const gameLogoText = document.createElement('h1');
        gameLogo.appendChild(gameLogoText);
        gameLogoText.textContent = 'TicTacToe';

        // Player Names
        const playerXContainer = document.createElement('div');
        const playerOContainer = document.createElement('div');
        playerXContainer.classList.add('player-x');
        playerOContainer.classList.add('player-o');
        const playerNameX = document.createElement('p');
        const playerNameO = document.createElement('p');
        playerXContainer.appendChild(playerNameX);
        playerOContainer.appendChild(playerNameO);
        gameboardContainer.appendChild(playerXContainer);
        gameboardContainer.appendChild(playerOContainer);
        playerNameX.textContent = `Player ${playerX.userMarker}:`;
        playerNameO.textContent = `Player ${playerO.userMarker}:`;

        return { playerXContainer, playerOContainer };
    }
    // Store returned elements
    const scoreElements = scoreInterface();

    // Score UI
    function playerScoreUI() {
        let playerScoreX = document.createElement('p');
        let playerScoreO = document.createElement('p');

        scoreElements.playerXContainer.appendChild(playerScoreX);
        scoreElements.playerOContainer.appendChild(playerScoreO);

        playerScoreX.textContent = '0';
        playerScoreO.textContent = '0';

        return { playerScoreX, playerScoreO };
    }
    const playerScoreElements = playerScoreUI();

    // Round UI
    function gameRoundUI() {
        const gameRoundContainer = document.createElement('div');
        gameRoundContainer.classList.add('game-round');
        gameboardContainer.appendChild(gameRoundContainer);

        let gameRoundText = document.createElement('p');
        gameRoundContainer.appendChild(gameRoundText);

        gameRoundText.textContent = `Round: ${gameRound}`;

        return { gameRoundText };
    }
    const gameRoundElements = gameRoundUI();

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
        });
    }

    // Players Turn
    function changePlayerTurn() {
        if (playerTurn === playerX) {
            displayPlayer = playerX.userMarker;
            playerTurn = playerO;
        } else {
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
        if (winResult === true) {
            if (displayPlayer === 'X') {
                playerX.giveScore();
                playerScoreElements.playerScoreX.textContent = playerX.getScore();
                resetBoard();
            } else {
                playerO.giveScore();
                playerScoreElements.playerScoreO.textContent = playerO.getScore();
                resetBoard();
            }
        } else {
            resetBoard();
        }
    }

    // Reset Function
    function resetBoard() {
        for (let i = 0; i < gameBoardArray.length; i++) {
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
        gameRoundElements.gameRoundText.textContent = `Round: ${++gameRound}`;
    }

    displayBoard();

    // return { gameboardContainer, gameBoardArray, displayBoard, gameLogic };
})();