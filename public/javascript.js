// Create new empty dictionary to store cell objects.
var cellDictionary = {};


function getBoard(difficulty) {
    // Add button to reset page with desired difficulty. 
    // Load easy by default.
    
    // Variables
    let cellIndex = [ 4, 10, 16 ];
    var min = 1;
    var max = 10;

    // reload empty board container div each time page refreshes
    const board = document.getElementById("board");
    board.innerHTML = "";
    board.className = "board";

    // set board class based on selected difficulty
    if (!difficulty) {
        var difficulty = 0;
        document.getElementById('board').classList.add('easy');
    } else {
        if (difficulty == 0) {
            document.getElementById('board').classList.add('easy');
        } else if (difficulty == 1) {
            document.getElementById('board').classList.add('moderate');
        } else if (difficulty == 2) {
            document.getElementById('board').classList.add('hard');
        }
    }
    
    // grid boundaries (in relation to clicked cell) when checking for mines
    const surroundingGrid = [ -(cellIndex[difficulty]-1), -(cellIndex[difficulty]), -(cellIndex[difficulty]+1), -1, 1, (cellIndex[difficulty]-1), (cellIndex[difficulty]), (cellIndex[difficulty]+1) ];

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
        var newCell = {
            id: newNode.id,
            isMine: false
        };
        
        // define click behavior.
        if ( random > 5 ) {
            newCell.isMine = true;
            newNode.onclick = function() {
                var element = document.getElementById(this.id);
                element.className = 'boom'; 
            };
        } else {
            newNode.onclick =  function() {
                let counter = 0;
                for (var cells of surroundingGrid) {
                    let it = Number(this.id) + Number(cells);
                    if ( it < 0 || it >= (cellIndex[difficulty]*cellIndex[difficulty]) ) {
                        // ignore grid if it goes out of bounds
                       // do nothing
                    } else if ( Number(this.id) % cellIndex[difficulty] == 0) {
                        // First column. Skip cells to the left.
                        if ( it == ((Number(this.id)-cellIndex[difficulty])-1) ||
                             it == (Number(this.id) - 1) ||
                             it == ((Number(this.id)+cellIndex[difficulty])-1)) { 
                                // do nothing
                        } else if (cellDictionary[it].isMine) {
                            counter += 1;
                        }
                    } else if ( (Number(this.id) - (cellIndex[difficulty]-1)) % cellIndex[difficulty] == 0) {
                        // Last column. Skip cells to the right.
                        if ( it == ((Number(this.id)-cellIndex[difficulty])+1) ||
                             it == (Number(this.id) + 1) ||
                             it == ((Number(this.id)+cellIndex[difficulty])+1)) { 
                                // do nothing
                        } else if (cellDictionary[it].isMine) {
                            counter += 1;
                        }
                    } else if (cellDictionary[it].isMine) {
                        counter += 1;
                    }
                }
                var element = document.getElementById(this.id);
                element.className = 'safe'; 
                element.innerHTML = counter;
            };
        }    
        //newNode.innerHTML = cellId;
        cellDictionary[newCell.id] = newCell;
        board.appendChild( newNode );
    
    }
}

function flag(id) {
    if (document.getElementById(id).className == 'flag') {
        document.getElementById(id).className = 'cell';
    } else {
        document.getElementById(id).className = 'flag';
    }
}
