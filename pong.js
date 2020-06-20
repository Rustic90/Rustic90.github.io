let canvas = document.querySelector("#gameBoard");
let ctx = canvas.getContext("2d");
let playerScore = 0;
let computerScore = 0;

// Create classes
class ball {
    constructor()
    {
        this.x = 300;
        this.y = 100;
        this.width = 10;
        this.height = 10;
        this.velocityX = 1;
        this.velocityY = 1;
    }
}

class paddle {
    constructor(X, Y)
    {
        this.x = X;
        this.y = Y; 
        this.width = 10;
        this.height = 100;
        this.velocity = 2.0;
    }
}

// Create Objects from Classes
var ball1 = new ball();
var paddle1 = new paddle(25, 200);
var paddle2 = new paddle(465, 200);

// Ball Physics
function physics() {
   
    paddle2.y += paddle2.velocity;
    if (paddle2.y + paddle2.height >= 500)
    {
        paddle2.velocity = -2.0;
    }
    else if (paddle2.y <= 0)
    {
        paddle2.velocity = 2.0;
    }

    ball1.x += ball1.velocityX;
    ball1.y += ball1.velocityY;
    if (ball1.x >= 490)
    {
        ball1.x = 250;
        ball1.y = 100;
        playerScore += 1;
        if (playerScore == 7)
        {
            clearInterval(t);
            alert("You Win!");
        }
        
    }
    else if (ball1.x <= 0)
    {
        ball1.x = 250;
        ball1.y = 100;
        computerScore += 1;
        if (computerScore == 7)
        {
            clearInterval(t);
            alert("You Lose");
        }
    }

    if (ball1.y >= 490)
    {
        ball1.velocityY = -ball1.velocityY;
        
    }
    else if (ball1.y <= 0)
    {
        ball1.velocityY = 1;
    }
    if (paddle1.x < ball1.x + ball1.width &&
        paddle1.x + paddle1.width > ball1.x &&
        paddle1.y < ball1.y + ball1.height &&
        paddle1.y + paddle1.height > ball1.y)
    {
        ball1.velocityX = -ball1.velocityX;
    }
    if (paddle2.x < ball1.x + ball1.width &&
        paddle2.x + paddle2.width > ball1.x &&
        paddle2.y < ball1.y + ball1.height &&
        paddle2.y + paddle2.height > ball1.y)
    {
        ball1.velocityX = -1;
    }
    
    render();
}

// Function that draws the game to the canvas
function render() 
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle="orange";
    ctx.fillRect(245,0,10, 500);
    ctx.fillStyle = "white";
    ctx.fillRect(ball1.x, ball1.y, ball1.width, ball1.height);
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.font = "28px Arial";
    ctx.fillText(playerScore, 120, 50);
    ctx.fillText(computerScore, 380, 50);
    
}

// Moves player paddle
function movePlayer(key)
{
    if (key.keyCode == 119)
    {
        if (paddle1.y <= 0)
        {
            render();
        }
        else 
        {
            paddle1.y -= 10;
            render();
        }
    }
    else if (key.keyCode == 115)
    {
        if (paddle1.y + paddle1.height >= 500)
        {
            render();
        }
        else 
        {
            paddle1.y += 10;
            render();
        }
    }
}

render();
let t = setInterval(physics, 10);
document.addEventListener("keypress", movePlayer);
