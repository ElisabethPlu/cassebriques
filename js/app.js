var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Le code suivant concerne la balle
//Pour que la balle entre en collision avec les murs marche avec sections sur le rebondissement
var ballRadius = 10;
//Définition de x et y pour déplacer la balle ensuite
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//Le code suivant concerne la raquette pour taper la balle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//Mur de briques
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 110;
var score = 0;
var lives = 3;

//Boucle pour installer les briques
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


//Événements raquette
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = true;
     }
     else if(e.keyCode == 37) {
         leftPressed = true;
     }
 }

 function keyUpHandler(e) {
       if(e.keyCode == 39) {
           rightPressed = false;
       }
       else if(e.keyCode == 37) {
           leftPressed = false;
       }
   }
//Collision balle brique
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
               if(b.status == 1) {
                 if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                   dy = -dy;
                    if(b.status = 0) {
                    }

                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("C'est gagné, Bravo!");
                        document.location.reload();

                    }
            }
          }
        }
    }
}

//Affichage du score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000080";
    ctx.fillText("Score: "+score, 8, 20);
}

//Affichage des vies
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000080";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#000080";
  ctx.fill();
  ctx.closePath();
}

//Pour la raquette
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000080";
    ctx.fill();
    ctx.closePath();
}
//Pour dessiner les briques
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#000080";
            ctx.fill();
            ctx.closePath();
          }
        }
    }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  drawBricks();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
           dx = -dx;
       }
       if(y + dy < ballRadius) {
           dy = -dy;
       }
       else if(y + dy > canvas.height-ballRadius) {
           if(x > paddleX && x < paddleX + paddleWidth) {
               dy = -dy;
           }
    else {
      lives--;
      if(!lives) {
        alert("Perdu");
        document.location.reload();

}
      else {
      x = canvas.width/2;
      y = canvas.height-30;
      dx = 3;
      dy = -3;
      paddleX = (canvas.width-paddleWidth)/2;
    }
  }
}

  //Pour déplacer la raquette + option pour qu'elle ne disparaisse pas du canva
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
              paddleX += 7;
          }
          else if(leftPressed && paddleX > 0) {
                      paddleX -= 7;
                  }
          x += dx;
          y += dy;
          requestAnimationFrame(draw);

}


draw();
