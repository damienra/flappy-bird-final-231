var bird;
var pipes = [];
var gameover = false;

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw() {
    background(0, 191, 255); // Sea blue background

    if (!gameover) {
        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                gameover = true;
                console.log("GAME OVER");
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        bird.update();
        bird.show();

        if (frameCount % 100 === 0) {
            pipes.push(new Pipe());
        }
    } else {
        // Game over state
        textAlign(CENTER);
        textSize(32);
        fill(255);
        text("GAME OVER", width / 2, height / 2);
    }
}

function keyPressed() {
    if (key === " " && !gameover) {
        bird.up();
    }
}

function mousePressed() {
    if (gameover) {
        // Reset the game
        gameover = false;
        pipes = [];
        bird = new Bird();
        pipes.push(new Pipe());
    }
}
