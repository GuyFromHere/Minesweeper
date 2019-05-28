// Global constants
const cellIndex = [ 10, 20, 30 ]; // define size of board based on difficulty
const mineCount = [ 12, 50, 112]; // define number of mines based on difficulty
const min = 1;
const max = 10;

// Empty dictionary to store cell objects.
var cellDictionary = {};

function flag(id) {
    if (document.getElementById(id).className == 'flag') {
        document.getElementById(id).className = 'cell';
    } else {
        document.getElementById(id).className = 'flag';
    }
}

function recursiveCellChecker(id, difficulty) {
    // get list of neighbor cells from cellDictionary
    // loop through each cell...
    // if it's a mine, add to counter
    // if not, move to next cell
    // when finished, if counter > 0 make that the innerHTML
    // if counter = 0 run this function against all the neighbor cells and clear the div HTML
    let counter = 0;
    //alert('check id = ' + id);
    for ( let neighborCell of cellDictionary[id].neighbors ) {
        if ( neighborCell < 0 || neighborCell >= (cellIndex[difficulty]*cellIndex[difficulty]) ) {
            //do nothing
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
    var element = document.getElementById(id);
    element.className = 'safe'; 
    element.innerHTML = counter; 
    // 
    if (counter == 0) {
        for ( var all of cellDictionary[id].neighbors ) {
            //alert('send to function: ' + cellDictionary[all].id)
            recursiveCellChecker(cellDictionary[all].id, difficulty)
        }
    }
}

function buildBoard(difficulty) {
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
    let mineCounter = 0;

    // grid boundaries (in relation to clicked cell) when checking for mines
    const surroundingGrid = [ -(cellIndex[difficulty]-1), -(cellIndex[difficulty]), -(cellIndex[difficulty]+1), 
        -1, 1, (cellIndex[difficulty]-1), (cellIndex[difficulty]), (cellIndex[difficulty]+1) ];

    // loop through board dimensions seeding with mines
    for (var i = 0; i<(cellIndex[difficulty]*cellIndex[difficulty]); i++) {  
        // get random number to determine if mine or safe
        var random = Math.floor(Math.random() * (+max - +min)) + +min
        
        // define div 
        var newNode = document.createElement('div')
        newNode.id = i;
        newNode.className = 'cell';
        newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
        newNode.setAttribute('onclick','javascript:sweep(this.id);');

        // get neighbor cells based on div id
        let neighborCells = [];
        // TODO: Get rid of the nested loop if possible. 
        for (var cells of surroundingGrid) {
            let neighborCell = Number(i) + Number(cells);
            neighborCells.push(neighborCell);
        }
        let newCell = {
            id: newNode.id,
            neighbors: neighborCells
        }; 

        // TODO: Find a better method of ensuring the mines are randomly dispersed in the grid.
        if ( random > 8 && mineCounter <= mineCount[difficulty] ) {
            newCell.isMine = true;
            mineCounter += 1;
        } else {
            newCell.isMine = false;
        }
        // 
        cellDictionary[newCell.id] = newCell;
        board.appendChild( newNode );
    }
}














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