const cellIndex = [ 10, 20, 30 ]
const mineCount = [ 12, 50, 112]; 
var difficulty = 0;
var cellDictionary = {};
const debug = true;

function resetLog() {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML = "";
}

function addLog(text) {
    var logDiv = document.getElementById("log");
    logDiv.innerHTML += ('<p>' + text + '</p>');
}

function flag(id) {
    if (document.getElementById(id).className == 'flag') {
        document.getElementById(id).className = 'cell';
    } else {
        document.getElementById(id).className = 'flag';
    }
}

function safe(id) {
    var element = document.getElementById(id);
    element.className = 'safe'; 
    element.innerHTML = cellDictionary[id].count;
}

function sweep(id) {
  if ( cellDictionary[id].isMine) {
    var element = document.getElementById(id);
    element.className = 'boom';
    element.innerHTML = "X";
  } else {
    checkSurroundingCells(id);
  }  
}

function clear(id) {
    var element = document.getElementById(id);
    element.className = 'clear';
}

function getRandomNumber(num) {
    var random = Math.floor(Math.random() * num);
    return random;
}

function seedMines(difficulty) {
    var mineCounter = 0;
    do {
        var randomX = getRandomNumber(cellIndex[difficulty]); 
        var randomY = getRandomNumber(cellIndex[difficulty]);
        if ( !cellDictionary[randomX + ' ' + randomY].isMine ) {
            cellDictionary[randomX + ' ' + randomY].isMine = true;
            mineCounter++;
            if (debug) {
              let cell = document.getElementById(randomX + ' ' + randomY);
              cell.innerHTML = "X";
            }
        }
    }
    while (mineCounter <= mineCount[difficulty] );
}

function checkSurroundingCells(id) {
  for (var x = Math.max(cellDictionary[id].posX-1,0);x<=Math.min(cellDictionary[id].posX+1,(cellIndex[difficulty]-1));x++) {
    for (var y = Math.max(cellDictionary[id].posY-1,0);y<=Math.min(cellDictionary[id].posY+1,(cellIndex[difficulty]-1));y++) {
      if ( cellDictionary[x + ' ' + y].isMine) {
        cellDictionary[id].count++;
      }
    }
  }
  if (cellDictionary[id].count > 0) {
    safe(id);
  } else {
    clear(id);
    for (var x = Math.max(cellDictionary[id].posX-1,0);x <=Math.min(cellDictionary[id].posX+1,(cellIndex[difficulty]-1));x++) {
    for (var y = Math.max(cellDictionary[id].posY-1,0);y <= Math.min(cellDictionary[id].posY+1,(cellIndex[difficulty]-1));y++) {
        if (document.getElementById(x + ' ' + y).className == 'cell') {
          checkSurroundingCells(x + ' ' + y, difficulty);
        }  
    } 
    }
    addLog('checkSurroundingCells: clicked ' + id + ', stopped at ' + x + ' ' + y);
  }
  
}

function buildBoard() {
    resetLog();
    var board = document.getElementById('board');
    board.innerHTML = "";
    board.className = "board";
    var difficulty = getDifficulty();
    if (!difficulty || difficulty == 0) {
            var difficulty = 0;
            board.classList.add('easy');
        } else if (difficulty == 1) {
            board.classList.add('moderate');
        } else if (difficulty == 2) {
            board.classList.add('hard');
        }
    for ( var x = 0; x < cellIndex[difficulty]; x++) {
        for ( var y = 0; y < cellIndex[difficulty]; y++) {
        var newNode = document.createElement('div');
        newNode.className = 'cell';
        newNode.id = (x + ' ' + y);
        newNode.innerHTML = "";
        newNode.setAttribute('oncontextmenu',
                            "javascript:flag(this.id);return false;");
        newNode.setAttribute('onclick',
                            'javascript:sweep(this.id);');
        let newCell = {
            id: newNode.id,
            posX: x,
            posY: y,
            count: 0,
            isMine: false
        }; 
        cellDictionary[newNode.id] = newCell;
        board.appendChild(newNode);
        }
    }
    seedMines(difficulty);

}

