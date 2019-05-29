/* // Global constants
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
} */

//var grid = document.getElementById('board-table');

function clearTable(id) {
    addLog('clearTable: triggered on cell ' + id);
    var element = document.getElementById(id);
    element.className = 'clear';
    element.innerHTML = "";
    //addLog('clearTable: ' + id);
}


function safeTable(id) {
    var element = document.getElementById(id);
    element.className = 'safe'; 
    element.innerHTML = cellDictionary[id].count;
}

function cellCheckerTable(id) {
    var mineCountTable = 0;
    //var cell = document.getElementById(id);
    var pos = id.split(" ");
    var cellRow = pos[0]
    var cellCol = pos[1];
    var grid = document.getElementById('board-table');

    // get count of surrounding mines
    for ( var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            //if (cellDictionary[i + ' ' + j].isMine) {
            var cell = cellDictionary[i + ' ' + j];
            if (cell.isMine) {
                mineCountTable++;
                addLog('cellCheckerTable: found mine at ' + cell.id);
            }
        }
    }
    
    if ( mineCountTable == 0) { 
        //Reveal all adjacent cells as they do not have a mine
        for (var i = Math.max(cellRow - 1, 0); i<=Math.min(cellRow + 1, 9); i++) {
          for(var j = Math.max(cellCol - 1, 0); j<=Math.min(cellCol + 1, 9); j++) {
              var cellId = (i + ' ' + j);
            //Recursive Call
              //addLog('cellCheckerTable: no mines at ' + cellId);
              clearTable(cellId);
              //cellCheckerTable(cellId);
          }
        }
    } else {
        cellDictionary[id].count = mineCountTable;
        safeTable(id);
    }
}

function getRandomNumberTable(x) {
    var random = Math.floor(Math.random() * x);
    return random;
}

function seedMinesTable(difficulty) {
    for ( var i = 0; i <= mineCount[difficulty]; i++ ) {
        var row = getRandomNumberTable(cellIndex[difficulty]);
        var col = getRandomNumberTable(cellIndex[difficulty]);
        var cellId = (row + " " + col)
        cellDictionary[cellId].isMine = true;
        //addLog('seedMinesTable: mine at ' + cellId)
    }
}

function buildBoardTable(difficulty) {
    const board = document.getElementById("board-table");
    board.innerHTML = "";
    //board.className = "board";
    // set board class based on selected difficulty
    if (!difficulty || difficulty == 0) {
        var difficulty = 0;
    }
    
    // Create board object to store board properties
    let Board = {
        mines: mineCount[difficulty]
    }; 

    for ( var x = 0; x < cellIndex[difficulty]; x++ ) {
        row = board.insertRow(x);
        for ( var i = 0; i < cellIndex[difficulty]; i++ ) {
            cell = row.insertCell(i);
            var newNode = document.createElement('div');
            newNode.id = (x + " " + i);
            newNode.className = 'cell';
            newNode.innerHTML = i;
            newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
            newNode.setAttribute('onclick','javascript:sweepTable(this.id);');
            let newCell = {
                id: newNode.id,
                difficulty: difficulty,
                isMine: false
            }; 
            cellDictionary[newCell.id] = newCell;
            cell.appendChild( newNode );
        }
    }
    // seed mines 
    seedMinesTable(difficulty);
}