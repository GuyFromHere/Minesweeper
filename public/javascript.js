function getBoard(difficulty) {
    // Add button to reset page with desired difficulty. 
    // Load easy by default.
    
    // Variables
    let cellIndex = [ 4, 10, 16 ];
    let rowIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
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
    
    // build board with area cellCount x cellCount
    for (var i = 0; i<cellIndex[difficulty]; i++) {  
        for (var x = 1; x<=cellIndex[difficulty]; x++) {
            // get random number to determine if mine or safe
            var random = Math.floor(Math.random() * (+max - +min)) + +min

            // create cell divs
            const cellId = (rowIndex[i] + String(x));
            var newNode = document.createElement('div')
            newNode.id = rowIndex[i] + x
            newNode.className = 'cell';
            newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
            newNode.count = i;
            var newCell = {
                id: newNode.id,
                isMine: false,
                isFlagged: false
            };

            // define click behavior.
            if ( random > 5 ) {
                newNode.onclick = function() {
                    var element = document.getElementById(this.id);
                    element.className = 'boom';
                };
                newCell.isMine = true;
            } else {
                newNode.onclick = function() {
                    var element = document.getElementById(this.id);
                    element.className = 'safe';
                };
            }
                       
            newNode.innerHTML = cellId;
            board.appendChild( newNode );
        }
        
    }
}

function flag(id) {
    
    if (document.getElementById(id).className == 'flag') {
        document.getElementById(id).className = 'cell';
    } else {
        document.getElementById(id).className = 'flag';
    }
}

// Create an object storing the cell's class (mine or safe) and state (flagged or unflagged).
// Add object to array at same 


function createObject(cellId, gridArray) {
    // placeholder for object logic if this is what I need to do...just barfing something out to work on later.
    var cellGrid = {
        id: cellId,
        isMine: false,
        isFlagged: false
    }
}