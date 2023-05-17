var bird;
var pipes = [];
var gameover = false;
var fails = 0;
var timer = 0;

function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent('game-container'); // Add an ID to the container div in your HTML: <div id="game-container"></div>

  applyFlexboxStyles(); // Apply flexbox styles

  bird = new Bird();
  pipes.push(new Pipe(gameover));
}

// Apply flexbox styles
function applyFlexboxStyles() {
  var body = document.body;
  body.style.display = 'flex';
  body.style.justifyContent = 'center';
  body.style.alignItems = 'center';
  body.style.height = '100vh';
  body.style.margin = '0';

  var gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'flex';
  gameContainer.style.justifyContent = 'center';
  gameContainer.style.alignItems = 'center';
  gameContainer.style.maxWidth = '90vw';
  gameContainer.style.maxHeight = '90vh';

  var canvas = document.querySelector('canvas');
  canvas.style.border = '1px solid black';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
}


function draw() {
  background(0, 191, 255); // Sea blue background

  if (!gameover) {
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (bird.hits(pipes[i])) {
        if (!pipes[i].scored) {
          fails++;
          pipes[i].scored = true;
          if (fails === 3) {
            gameover = true;
          }
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 100 === 0) {
      pipes.push(new Pipe(gameover));
    }
  } else {
    // Game over state
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("GAME OVER", width / 2, height / 2);
  }

  // Display fails
  textSize(24);
  fill(255);
  text("Fails: " + fails, 10, 30);

  // Display timer
  textSize(24);
  fill(255);
  text("Timer: " + Math.floor(timer / 60) + "s", width - 150, 30);

  // Update timer
  if (!gameover) {
    timer++;
  }
}

function keyPressed() {
  if (key === " ") {
    if (gameover) {
      // Restart the game
      gameover = false;
      pipes = [];
      bird = new Bird();
      pipes.push(new Pipe(gameover));
      fails = 0;
      timer = 0;
    } else {
      bird.up();
    }
  }
}

function mousePressed() {
  if (gameover) {
    // Restart the game
    gameover = false;
    pipes = [];
    bird = new Bird();
    pipes.push(new Pipe(gameover));
    fails = 0;
    timer = 0;
  } else {
    bird.up();
  }
}

// Add this line to initialize the game
setup();
