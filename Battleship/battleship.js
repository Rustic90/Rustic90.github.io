// Declare game states. 0 = hasn't begun. 1 = placing ships. 2 = playing.
let gameState = 0;

// Ships
let playerShips = 0;
let computerShips = 0;

// Create variable to hold random ship location
let randomX;
let randomY;

// Game Boards
let playerBoard = [
    ['a1', 'a2', 'a3', 'a4', 'a5'],
    ['b1', 'b2', 'b3', 'b4', 'b5'],
    ['c1', 'c2', 'c3', 'c4', 'c5'],
    ['d1', 'd2', 'd3', 'd4', 'd5'],
    ['e1', 'e2', 'e3', 'e4', 'e5']
];
let computerBoard = [
    ['f1', 'f2', 'f3', 'f4', 'f5'],
    ['g1', 'g2', 'g3', 'g4', 'g5'],
    ['h1', 'h2', 'h3', 'h4', 'h5'],
    ['i1', 'i2', 'i3', 'i4', 'i5'],
    ['j1', 'j2', 'j3', 'j4', 'j5']
];

// Draws boards to screen
playerBoard.forEach(array => {
    array.forEach(position => {
        var btn = document.createElement("button");
        btn.setAttribute("id", position);
        btn.setAttribute("onclick", "place(this.id)");
        btn.style.backgroundColor = "blue";
        document.getElementById("player-board").appendChild(btn);
    })
    document.getElementById("player-board").innerHTML += "<br>";
}); 

computerBoard.forEach(array => {
    array.forEach(position => {
        var btn = document.createElement("button");
        btn.setAttribute("id", position);
        btn.setAttribute("onclick", "shoot(this.id)");
        btn.style.backgroundColor = "blue";
        document.getElementById("computer-board").appendChild(btn);
    })
    document.getElementById("computer-board").innerHTML += "<br>";
}); 

// Function for placing player ships
function place(coords)
{
    if (gameState == 1){
        
        playerShips += 1;
        if (playerShips <= 5)
        {
            document.getElementById("information").innerHTML += `<p>Please place ${5-playerShips} more ships.</p>`;
            document.getElementById(coords).style.backgroundColor = "green";
            if (coords.includes('a'))
            {
                position = playerBoard[0].indexOf(coords);
                playerBoard[0][position] = "ship";
            }
            else if (coords.includes('b'))
            {
                position = playerBoard[1].indexOf(coords);
                playerBoard[1][position] = "ship";
            }
            else if (coords.includes('c'))
            {
                position = playerBoard[2].indexOf(coords);
                playerBoard[2][position] = "ship";
            }
            else if (coords.includes('d'))
            {
                position = playerBoard[3].indexOf(coords);
                playerBoard[3][position] = "ship";
            }
            else if (coords.includes('e'))
            {
                position = playerBoard[4].indexOf(coords);
                playerBoard[4][position] = "ship";
            }
        }
        if (playerShips == 5)
        {
                document.getElementById("information").innerHTML += `<p> All ships placed. You may begin firing at the enemy! </p>`;
                gameState = 2;
                shipsLeft();
        }
    }
}

// Function for shooting at enemy
function shoot(coords)
{
    if (gameState == 2)
    {
        if (computerBoard[0].includes(coords) || computerBoard[1].includes(coords) || computerBoard[2].includes(coords) || computerBoard[3].includes(coords) || computerBoard[4].includes(coords))
        {
            console.log("miss");
            document.getElementById(coords).style.backgroundColor = "black";
            returnFire();
            shipsLeft();
        }
        else 
        {
            console.log("hit");
            document.getElementById(coords).style.backgroundColor = "red";
            computerShips--;
            returnFire();
            shipsLeft();
        }
        
    }
}

// Function for computer returning fire
function returnFire()
{
    randomX = Math.floor(Math.random()*5);
    randomY = Math.floor(Math.random()*5);
    if (playerBoard[randomX][randomY] == "ship")
    {
        playerBoard[randomX][randomY] = "hit";
        playerShips--;
        if(randomX == 0){randomX = 'a';}
        else if(randomX == 1){randomX = 'b';}
        else if(randomX == 2){randomX = 'c';}
        else if(randomX == 3){randomX = 'd';}
        else if(randomX == 4){randomX = 'e';}
        document.getElementById(randomX + (randomY+1)).style.backgroundColor = "red";
    }
    else if (playerBoard[randomX][randomY] == "hit")
    {
        returnFire();
    }
    else if (playerBoard[randomX][randomY] == "miss")
    {
        returnFire();
    }
    else 
    {
        document.getElementById(playerBoard[randomX][randomY]).style.backgroundColor="black";
        playerBoard[randomX][randomY] = "miss";
    }
    
}
// Function once play button is clicked to begin game
function beginGame()
{
    gameState = 1;
    document.getElementById("information").innerHTML += "<p> Welcome to Battleship. Enemy ships have been placed. Place 5 ships on the player board.</p>";
    while (computerShips < 5)
    {
        randomX = Math.floor(Math.random()*5);
        randomY = Math.floor(Math.random()*5);
        if (computerBoard[randomX][randomY] != "ship")
        {
            computerBoard[randomX][randomY] = "ship";
            computerShips++;
        }
    }
}

// Function for writing how many ships are left
function shipsLeft()
{
    document.getElementById("ships-left").innerHTML = "";
    document.getElementById("ships-left").innerHTML += `Player: ${playerShips} <br> Computer: ${computerShips}`;

    if (playerShips == 0)
    {
        setTimeout(function(){alert("Game Over")}, 500);
    }
    else if (computerShips == 0)
    {
        setTimeout(function(){alert("You Win!")}, 500);
    }
}