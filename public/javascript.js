// Global constants
const cellIndex = [ 10, 20, 30 ]; // define size of board based on difficulty
const mineCount = [ 12, 50, 112]; // define number of mines based on difficulty
const min = 1;
const max = 10;

// Empty dictionary to store cell objects.
var cellDictionary = {};

// Keep track of mine locations...for reasons? May not need it beyond troubleshooting.
var mineArray = [];

function resetLog() {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML = "";
}

function addLog(text) {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML += ('<p>' + text + '</p>');
}

function getRandomNumber(x, y) {
    var random = Math.floor(Math.random() * (x * y));
    return random;
}

function flag(id) {
    if (document.getElementById(id).className == 'flag') {
        document.getElementById(id).className = 'cell';
    } else {
        document.getElementById(id).className = 'flag';
    }
}

function clear(id) {
    var element = document.getElementById(id);
    element.className = 'clear';
    element.innerHTML = "";
}

function safe(id) {
    var element = document.getElementById(id);
    element.className = 'safe'; 
    element.innerHTML = cellDictionary[id].count;
}

/* function getNeighbors(id) {
    // Function to get neighbor cell array and store it in object's neighbors property
    // checks for boundaries of surrounding grid using object's difficulty property and cellIndex
    // this way we'll have define the borders of the cell checker in the object itself
    var cell = cellDictionary[id];
} */

// called on left click. This function sets the innerHTML to display the counter property of the cell.
// if counter = 0, display an empty cell and get the counter properties of neighboring cells
function cellChecker(id) {
    var element = document.getElementById(id);
    if ( cellDictionary[id].count == 0 ) {
        clear(id);
        whereTheMinesAt(id);

    } else {
        // not zero. change class to safe and display counter in innerHTML
        safe(id);
    }

}

// Add mines randomly to the board.
function seedMines(Board) {
    var mineCounter = 0;
    do {
        var randomCell = getRandomNumber(Board.x, Board.y); 
        if ( !cellDictionary[randomCell].isMine ) {
            cellDictionary[randomCell].isMine = true;
            mineArray.push(randomCell);
            mineCounter++;
        }
    }
    while (mineCounter <= Board.mines );
}

//
function whereTheMinesAt(id) {
    var cell = cellDictionary[id];
    addLog(cell.neighbors);
    for ( var n of cell.neighbors )
    {
        addLog(cellDictionary[n].count);
        if (cellDictionary[n].count == 0) {
            clear(n);
        } else {
            safe(n);
        }
    }
}

// get surrounding mine count and store that as a property of the cell object
function getSurroundingMines(id, difficulty) {
    let counter = 0;
    for ( let neighborCell of cellDictionary[id].neighbors ) {
        if ( neighborCell < 0 || neighborCell >= (cellIndex[difficulty]*cellIndex[difficulty]) ) {
            // Cells above or below the grid. Do nothing
        } else if ( Number(id) % cellIndex[difficulty] == 0) {
            // First column. Skip cells to the left.
            if ( neighborCell == ((Number(id)-cellIndex[difficulty])-1) ||
                 neighborCell == (Number(id) - 1) ||
                 neighborCell == ((Number(id)+cellIndex[difficulty])-1)) { 
                    // do nothing
            } else if (cellDictionary[neighborCell].isMine) {
                counter += 1;
            }
        } else if ( (Number(id) - (cellIndex[difficulty]-1)) % cellIndex[difficulty] == 0) {
            // Last column. Skip cells to the right.
            if ( neighborCell == ((Number(id)-cellIndex[difficulty])+1) ||
                 neighborCell == (Number(id) + 1) ||
                 neighborCell == ((Number(id)+cellIndex[difficulty])+1)) { 
                    // do nothing
            } else if (cellDictionary[neighborCell].isMine) {
                counter += 1;
            }
        } else if (cellDictionary[neighborCell].isMine) {
            counter += 1;
        }
    }
    cellDictionary[id].count = counter;
}



function buildBoard(difficulty) {
    resetLog();
    // reload empty board container div each time page refreshes (is there a better way to do this...???)
    const board = document.getElementById("board");
    board.innerHTML = "";
    board.className = "board";
    addLog('Generating new board...');

    // set board class based on selected difficulty
    if (!difficulty || difficulty == 0) {
        var difficulty = 0;
        document.getElementById('board').classList.add('easy');
    } else if (difficulty == 1) {
        document.getElementById('board').classList.add('moderate');
    } else if (difficulty == 2) {
        document.getElementById('board').classList.add('hard');
    }

    // Create board object to store board properties
    let Board = {
        x: cellIndex[difficulty],
        y: cellIndex[difficulty],
        mines: mineCount[difficulty]
    }; 

    // grid boundaries (in relation to clicked cell) when checking for mines
    const surroundingGrid = [ -(cellIndex[difficulty]+1), -(cellIndex[difficulty]), -(cellIndex[difficulty]-1), 
        -1, 1, (cellIndex[difficulty]-1), (cellIndex[difficulty]), (cellIndex[difficulty]+1) ];

    // loop through board dimensions seeding with mines
    for (var i = 0; i<(cellIndex[difficulty]*cellIndex[difficulty]); i++) {  
        // define div 
        var newNode = document.createElement('div');
        newNode.id = i;
        newNode.className = 'cell';
        newNode.innerHTML = i;
        newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
        newNode.setAttribute('onclick','javascript:sweep(this.id);');

        // get neighbor cells based on div id
        let neighborCells = [];
        for (var cells of surroundingGrid) {
            let neighborCell = Number(i) + Number(cells);
            neighborCells.push(neighborCell);
        }
        let newCell = {
            id: newNode.id,
            difficulty: difficulty,
            neighbors: neighborCells
        }; 

        cellDictionary[newCell.id] = newCell;
        board.appendChild( newNode );
    }
    // seed mines 
    seedMines(Board);
    // now that we know where the mines are we can count them and store that as a cell property
    for (var i = 0; i<(cellIndex[difficulty]*cellIndex[difficulty]); i++) {  
        getSurroundingMines(i, difficulty);
    }
}













// OLD BELOW

function getBoard(difficulty) {
    // reload empty board container div each time page refreshes (is there a better way to do this...???)
    const board = document.getElementById("board");
    board.innerHTML = "";
    board.className = "board";

    // set board class based on selected difficulty
    if (!difficulty || difficulty == 0) {
        var difficulty = 0;
        document.getElementById('board').classList.add('easy');
    } else if (difficulty == 1) {
        document.getElementById('board').classList.add('moderate');
    } else if (difficulty == 2) {
        document.getElementById('board').classList.add('hard');
    }
    
    // grid boundaries (in relation to clicked cell) when checking for mines
    const surroundingGrid = [ -(cellIndex[difficulty]-1), -(cellIndex[difficulty]), -(cellIndex[difficulty]+1), 
                        -1, 1, (cellIndex[difficulty]-1), (cellIndex[difficulty]), (cellIndex[difficulty]+1) ];

    // build board with area cellCount x cellCount
    for (var i = 0; i<(cellIndex[difficulty]*cellIndex[difficulty]); i++) {  
        // get random number to determine if mine or safe
        var random = Math.floor(Math.random() * (+max - +min)) + +min
        // create cell divs
       const cellId = i;
       
        var newNode = document.createElement('div')
        newNode.id = i;
        newNode.className = 'cell';
        newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
        newNode.count = i;
        let newCell = {
            id: newNode.id,
            isMine: false
        };
        
        // define click behavior.
        if ( random > 8 ) {
            newCell.isMine = true;
            newNode.setAttribute('onclick','javascript:sweep(this.id);');
            /* newNode.onclick = function() {
                var element = document.getElementById(this.id);
                element.className = 'boom'; 
            }; */
        } else {
            newNode.setAttribute('onclick','javascript:test(this.id);');
            /* newNode.onclick = function() {
                let counter = 0;
                for (var cells of surroundingGrid) {
                    let neighborCell = Number(this.id) + Number(cells);
                    if ( neighborCell < 0 || neighborCell >= (cellIndex[difficulty]*cellIndex[difficulty]) ) {
                        //do nothing
                    } else if ( Number(this.id) % cellIndex[difficulty] == 0) {
                        // First column. Skip cells to the left.
                        if ( neighborCell == ((Number(this.id)-cellIndex[difficulty])-1) ||
                             neighborCell == (Number(this.id) - 1) ||
                             neighborCell == ((Number(this.id)+cellIndex[difficulty])-1)) { 
                                // do nothing
                        } else if (cellDictionary[neighborCell].isMine) {
                            counter += 1;
                        }
                    } else if ( (Number(this.id) - (cellIndex[difficulty]-1)) % cellIndex[difficulty] == 0) {
                        // Last column. Skip cells to the right.
                        if ( neighborCell == ((Number(this.id)-cellIndex[difficulty])+1) ||
                             neighborCell == (Number(this.id) + 1) ||
                             neighborCell == ((Number(this.id)+cellIndex[difficulty])+1)) { 
                                // do nothing
                        } else if (cellDictionary[neighborCell].isMine) {
                            counter += 1;
                        }
                    } else if (cellDictionary[neighborCell].isMine) {
                        counter += 1;
                    }
                }
                var element = document.getElementById(this.id);
                element.className = 'safe'; 
                element.innerHTML = counter;

                // if counter = 0, reveal all of surrounding grid
                if ( counter == 0 ) {
                    recursiveCellChecker(this.id, cellIndex, difficulty, surroundingGrid);
                }
            }; */
        }    
        cellDictionary[newCell.id] = newCell;
        board.appendChild( newNode );
    
    }
}