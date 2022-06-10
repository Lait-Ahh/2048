function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getEmptyCases() {
    const cases = [];
    for(let x = 0; x < 4; x++) for(let y = 0; y < 4; y++) {
        if(document.querySelectorAll('.GameBoard__Line')[y].querySelectorAll('.GameBoard__Cell')[x].innerHTML === '') cases.push({ x: x, y: y }); 
    }
    return cases;
}

function getFilledCells() {
    const cases = [];
    for(let x = 0; x < 4; x++) for(let y = 0; y < 4; y++) {
        if(document.querySelectorAll('.GameBoard__Line')[y].querySelectorAll('.GameBoard__Cell')[x].innerHTML !== '') cases.push({ x: x, y: y }); 
    }
    return cases;
}

function getRandomEmptyCase() {
    const emptyCases = getEmptyCases();
    const index =  randomInt(0, emptyCases.length - 1);
    return emptyCases[index];
}

/**
 * 
 * @param {json} caseCoords x & y coords
 * @param {number} value number of this tile
 */
function setCase(caseCoords, value) {
    const selectedCase = document.querySelectorAll('.GameBoard__Line')[caseCoords.y].querySelectorAll('.GameBoard__Cell')[caseCoords.x];
    selectedCase.innerHTML = value;
    selectedCase.setAttribute('number', value);
}

function resetBoard() {
    document.querySelectorAll('.GameBoard__Line').forEach(line => line.querySelectorAll('.GameBoard__Cell').forEach(cell => {
        cell.innerHTML = '';
        cell.setAttribute('number', '');
    }));

    // Fill two cells
    setCase(getRandomEmptyCase(), 2);
    setCase(getRandomEmptyCase(), 2);
}

function moveCells(key) {
    // MOVE

    switch(key) {
        case 'ArrowUp':
            getFilledCells().forEach(cell => {
                 
            });
        break;
        case 'ArrowDown':

        break;
        case 'ArrowLeft':

        break;
        case 'ArrowRight':

        break;
    }

    // ADD

    // CALCULATE WITh PROBABILITES THE NUMBER
    // FILL A RANDOM EMPTY CELL
}

window.addEventListener('keydown', (e) => moveCells(e.key));

// Get & Print high score
const highScore = localStorage.getItem('high-score');
document.querySelector('p#high-score').innerHTML = `Meilleur score: ${highScore !== null ? highScore : 0}`;

resetBoard();