// Global constants
const cellIndex = [ 10, 20, 30 ]; // define size of board based on difficulty
const mineCount = [ 12, 50, 112]; // define number of mines based on difficulty
const min = 1;
const max = 10;

// Empty dictionary to store cell objects.
var cellDictionary = {};

function resetLog() {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML = "";
}

function addLog(text) {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML += ('<p>' + text + '</p>');
}

// TODO: this function.
function endGame() {
    alert('BOOM! This will be a modal with stats, etc.');
}

function safe(id, mines) {
    var cell = getElementById(id);
    cell.innerHTML = cellDictionary[id].innerHTML;
    cell.className = 'safe';
}

// id is passed from the cell object as either the id or posX + posY attributes
// 
function click(id) {
    let mines = 0;
    // when user clicks, check for mine
    if ( cellDictionary[id].isMine ) {
        endGame();
    } else {
        // if not a mine, check neighbor cells and count their mines
        for ( var x = cellDictionary[id].posX-1; x <= cellDictionary[id].posX+1; x++) {
            for ( var y = cellDictionary[id].posY-1; y <= cellDictionary[id].posY+1; y++) {
                if ( cellDictionary[x + ' ' + y].isMine ) {
                    mines++;
                } 
            }   
        }
        // if there are mines in neighbor cells, call safe function and display the count
        if ( mines > 0 ) { 
            safe(id, mines);
        } else if ( mines == 0 ) {
            for ( var x = cellDictionary[id].posX-1; x <= cellDictionary[id].posX+1; x++) {
                for ( var y = cellDictionary[id].posY-1; y <= cellDictionary[id].posY+1; y++) {
                    click(x + ' ' + y);
                }
            }
        }
    }
}