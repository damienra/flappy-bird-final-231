function Pipe(gameover) {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 2;
  this.scored = false;
  this.gameover = gameover;

  this.show = function () {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    }
    return false;
  };

  this.hits = function (bird) {
    if (
      (bird.y < this.top || bird.y > height - this.bottom) &&
      bird.x > this.x &&
      bird.x < this.x + this.w
    ) {
      if (!this.scored) {
        this.scored = true;
        return true;
      }
    }
    return false;
  };
}
