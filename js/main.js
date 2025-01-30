//Gameboard object
const gameBoard = (function () {
    const gameboardContainer = document.querySelector('.gameboard-container');
    const gameBoardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    let gameRound = 1;

    // Create Players
    function createPlayer(userMarker, score) {
        let userScore = 0;
        const getScore = () => userScore;
        const giveScore = () => userScore++;
        return { userScore, userMarker, giveScore, getScore, score };
    }

    // Players
    const playerX = createPlayer('X', 0);
    const playerO = createPlayer('O', 0);

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
    }
    // Store returned elements
    const scoreElements = scoreInterface();

    // Player Names UI
    function playerNames(playerMarker) {
        // Player Names
        const playerContainer = document.createElement('div');
        playerContainer.classList.add(`player-${playerMarker}`);
        const playerName = document.createElement('p');

        playerContainer.appendChild(playerName);
        gameboardContainer.appendChild(playerContainer);

        //to be updated with input names ******************
        playerName.textContent = `Player ${playerMarker}:`;

        return { playerContainer };
    }
    const playerNameX = playerNames('x');
    const playerNameO = playerNames('o');

    // Score UI
    function playerScoreUI() {
        let playerScoreX = document.createElement('p');
        let playerScoreO = document.createElement('p');

        playerNameX.playerContainer.appendChild(playerScoreX);
        playerNameO.playerContainer.appendChild(playerScoreO);

        playerScoreX.textContent = playerX.score;
        playerScoreO.textContent = playerO.score;

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
        let boardFull = true;

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

        // check if board is full
        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                if(gameBoardArray[i][j] === '') {
                    boardFull = false;
                }
            }
        }

        if(boardFull) {
            alert('Game is a tie');
            resetBoard();
        }
    }

    // Win Function
    function winUI() {
        let winResult = confirm(`Player ${displayPlayer} has won! Continue?`);
        if (winResult === true) {
            if (displayPlayer === 'X') {
                playerX.giveScore();
                playerScoreElements.playerScoreX.textContent = ++playerX.score;
                gameRoundElements.gameRoundText.textContent = `Round: ${++gameRound}`;
                gameEnds();
                resetBoard();
            } else {
                playerO.giveScore();
                playerScoreElements.playerScoreO.textContent = ++playerO.score;
                gameRoundElements.gameRoundText.textContent = `Round: ${++gameRound}`;
                gameEnds();
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
    }

    // Evaluate winner
    function gameEnds() {
        //Best of 5
        if (gameRound >= 3) {
            if (playerX.score >= 3) {
                alert('playerX has won the match');
                resetHandlers();
            } else if (playerO.score >= 3) {
                alert('playerO has won the match');
                resetHandlers();
            }
        }
    }

    // Reset Handles
    function resetHandlers() {
        // Reset players' scores
        playerX.score = 0;
        playerO.score = 0;

        playerScoreElements.playerScoreX.textContent = playerX.score;
        playerScoreElements.playerScoreO.textContent = playerO.score;

        // Reset Round
        gameRound = 0;
        gameRoundElements.gameRoundText.textContent = `Round: ${gameRound}`;
    }

    // Back to Menu
    function backToMenu() {
        const backMenuBtn = document.createElement('button');
        backMenuBtn.classList.add('back-menu-btn');
        backMenuBtn.textContent = 'Back to Menu';

        gameboardContainer.appendChild(backMenuBtn);

        backMenuBtn.addEventListener('click', () => {
            menuPageElement.menuContainer.style.display = 'flex';
            menuPageElement.menuContainer.style.opacity = 100;

            resetHandlers();
            resetBoard();
        });
    }

    displayBoard();
    backToMenu();

})();

// Menu Page
const gameMenu = (function () {
    //Outer form container
    const menuContainer = document.querySelector('.menu-page');
    const playerForm = document.createElement('form');
    menuContainer.appendChild(playerForm);

    // Menu Player Input UI
    function createPlayerMenu(playerNumber) {
        const playerContainer = document.createElement('div');
        playerContainer.classList.add(`player${playerNumber}-container`);

        const playerLabel = document.createElement('label');
        playerLabel.textContent = `Player ${playerNumber}: `;

        const playerInput = document.createElement('input');
        playerInput.placeholder = 'Enter name...';

        playerForm.appendChild(playerContainer);
        playerContainer.appendChild(playerLabel);
        playerContainer.appendChild(playerInput);

        return { playerInput };
    }
    const player1MenuElement = createPlayerMenu(1);
    const player2MenuElement = createPlayerMenu(2);

    //Submit Button UI
    function submitPlayerNames() {
        const submitBtn = document.createElement('input');
        submitBtn.textContent = 'Submit';
        submitBtn.type = 'submit';

        playerForm.appendChild(submitBtn);

        // Submit Event Listener
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const player1Name = player1MenuElement.playerInput.value;
            const player2Name = player2MenuElement.playerInput.value;

            let player1Box = document.querySelector('.player-x p');
            let player2Box = document.querySelector('.player-o p');

            if (player1MenuElement.playerInput.value === '' || player1MenuElement.playerInput.value === null) {
                player1Box.textContent = `Player x: `;
            } else {
                player1Box.textContent = `${player1Name}: `;
            }

            if (player2MenuElement.playerInput.value === '' || player2MenuElement.playerInput.value === null) {
                player2Box.textContent = `Player o: `;
            } else {
                player2Box.textContent = `${player2Name}: `;
            }

            function removeMenuPage() {
                menuContainer.style.display = 'none';
            }

            menuContainer.style.opacity = 0;
            setTimeout(removeMenuPage, 550);
        });
    }

    submitPlayerNames();

    return { menuContainer };
}());

const menuPageElement = gameMenu;