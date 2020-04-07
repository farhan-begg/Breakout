/* eslint-disable no-alert */
// *****************************************************
// DOM reference
// *****************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// *****************************************************
// Variables
// *****************************************************


// -----------------------------------------------------
// Constant
// -----------------------------------------------------

const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 2,
  dy: -2,
};

// -----------------------------------------------------
// Variables
// -----------------------------------------------------

let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// -----------------------------------------------------
// Setup Bricks Array
// -----------------------------------------------------

const bricks = [];

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}

// -----------------------------------------------------
// Functions
// -----------------------------------------------------

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        // eslint-disable-next-line max-len
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// Ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
// Paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
// Bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}


// -------------------------------------------------------
// Game Loop
// -------------------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();


  // Bounce the ball of the left and the right of the canvas
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 3;
        ball.dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Draw the Screen Again
  requestAnimationFrame(draw);
}

// -------------------------------------------------------
// Event Listeners
// -------------------------------------------------------

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// *********************************************************
// Register Events
// *********************************************************

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
