function getBoard(difficulty) {
    // get board status and reload. 
    // Has to be AJAX so it can store persistent board status. I'll need to learn more about that...
    // For now I'm just working out the look and feel of the board.
    if (!difficulty) {
        var difficulty = 0;
    }
    let cellIndex = [ 4, 10, 16 ];
    let rowIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    var min = 1;
    var max = 10;

    const board = document.getElementById("board");
    // build board with area cellCount x cellCount
    for (var i = 0; i<cellIndex[difficulty]; i++) {  
        for (var x = 1; x<=cellIndex[difficulty]; x++) {
            // get random number to determine if mine or safe
            var random = Math.floor(Math.random() * (+max - +min)) + +min

            // create cell divs
            var cellId = (rowIndex[i] + String(x));
            var newNode = document.createElement('div')
            //newNode.setAttribute('id', cellId); 
            newNode.id = rowIndex[i] + x
            //newNode.setAttribute('class', 'cell');
            newNode.className = 'cell';
            //newNode.oncontextmenu = "javascript:alert('hello');return false;";
            newNode.setAttribute('oncontextmenu',"javascript:flag(this.id);return false;");
            newNode.count = i;

            // define click behavior.
            if ( random > 5 ) {
                newNode.onclick = function() {
                    var element = document.getElementById(this.id);
                    element.className = 'boom';
                };
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

function boom() {
    alert('You died!');
}

function flip() {
    alert('you safe!');
}