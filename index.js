var score = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getEmptyCells() {
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

function getRandomEmptyCell() {
    const emptyCases = getEmptyCells();
    const index = randomInt(0, emptyCases.length - 1);
    return emptyCases[index];
}

function setCase(cellCoords, value) {
    const cell = document.querySelectorAll('.GameBoard__Line')[cellCoords.y].querySelectorAll('.GameBoard__Cell')[cellCoords.x];
    cell.innerHTML = value;
    cell.setAttribute('number', value);
}

function resetBoard() {
    document.querySelectorAll('.GameBoard__Line').forEach(line => line.querySelectorAll('.GameBoard__Cell').forEach(cell => {
        cell.innerHTML = '';
        cell.setAttribute('number', '');
    }));
    resetCells();
    setCase(getRandomEmptyCell(), 2);
    setCase(getRandomEmptyCell(), 2);
}

function getCellContent(cellCoords) {
    if(cellCoords.x < 0 || cellCoords.y < 0 || cellCoords.x >= 4 || cellCoords.y >= 4) return null;
    const cell = document.querySelectorAll('.GameBoard__Line')[cellCoords.y].querySelectorAll('.GameBoard__Cell')[cellCoords.x];
    return cell;
}

function getAdjacentCells(cellCoords) {
    const cells = [
        { x: cellCoords.x, y: cellCoords.y - 1 },
        { x: cellCoords.x, y: cellCoords.y + 1 },
        { x: cellCoords.x + 1, y: cellCoords.y },
        { x: cellCoords.x - 1, y: cellCoords.y }
    ];
    cells.forEach(cell => {
        if(cell.x < 0 || cell.y < 0 || cell.x >= 4 || cell.y >= 4) {
            const index = cells.indexOf(cell);
            cells.splice(index, 1);
        }
    });
    return cells;
}

function getAdjacentCell(cellCoords, side) {
    let cell;
    switch(side) {
        case 'up': 
            cell = { x: cellCoords.x, y: cellCoords.y - 1 };
        break;
        case 'down': 
            cell = { x: cellCoords.x, y: cellCoords.y + 1 };
        break;
        case 'left': 
            cell = { x: cellCoords.x - 1, y: cellCoords.y };
        break;
        case 'right': 
            cell = { x: cellCoords.x + 1, y: cellCoords.y };
        break;
    }
    return (cell.x < 0 || cell.y < 0 || cell.x >= 4 || cell.y >= 4 ? null : cell);
}

function resetCells() {
    for(let x = 0; x < 4; x++) for(let y = 0; y < 4; y++) {
        document.querySelectorAll('.GameBoard__Line')[y].querySelectorAll('.GameBoard__Cell')[x].setAttribute('combined', 'false');
    }
}

function moveCells(key) {
    if(key.includes('Arrow')) {
        for(let i = 0; i < 4; i++) {
            getFilledCells().forEach(cell => {
                const sideCellPos = getAdjacentCell(cell, key.replace('Arrow', '').toLowerCase());
                if(sideCellPos !== null) {
                    const sideCellContent = getCellContent(sideCellPos);
                    const actualCell = getCellContent(cell);
                    if(sideCellContent.innerHTML === actualCell.innerHTML) {
                        const number = parseInt(actualCell.innerHTML) * 2;
                        sideCellContent.setAttribute('number', number);
                        sideCellContent.innerHTML = number;
                        sideCellContent.setAttribute('combined', 'true');
                        actualCell.setAttribute('number', '');
                        actualCell.innerHTML = '';
                        score += number;
        
                    } else if(sideCellContent.innerHTML === '') {
                        sideCellContent.setAttribute('number', actualCell.getAttribute('number'));
                        sideCellContent.innerHTML = actualCell.innerHTML;
                        actualCell.setAttribute('number', '');
                        actualCell.innerHTML = '';
                    }
                }
            });
        }
        updateScore();
        let number = 2;
        if(score > 1000 && Math.random() > 0.5) number = 4;
        if(score > 2000 && Math.random() > 0.6) number = 8;
        if(score > 8000 && Math.random() > 0.8) number = 16;
        setCase(getRandomEmptyCell(), 2);
    }
}

window.addEventListener('keydown', (e) => moveCells(e.key));

function updateScore() {
    document.querySelector('p#score').innerHTML = `Score: ${score}`;
    let highScore = localStorage.getItem('high-score');
    if(typeof highScore !== 'number') highScore = 0; 
    if(highScore < score) {
        highScore = score;
        localStorage.setItem('high-score', score);
    }
    document.querySelector('p#high-score').innerHTML = `Meilleur score: ${highScore}`;
}
updateScore();

resetBoard();