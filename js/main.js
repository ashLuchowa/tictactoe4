//Gameboard object
const gameBoard = (function() {
    const firstRow = [1,2,3];
    const secondRow = [4,5,6];
    const thirdRow = [7,8,9];
    return {firstRow, secondRow, thirdRow};
})();


for(let i = 0; i < gameBoard.firstRow.length; i++) {
    gameBoard.firstRow[i] = 'X';
    console.log(gameBoard.firstRow[i]);    
}

console.table(gameBoard);


if(gameBoard.firstRow[0] && gameBoard.firstRow[1] && gameBoard.firstRow[2] === 'X') {
    console.log('player won the game');
} else {
    console.log('player lost the game');
}