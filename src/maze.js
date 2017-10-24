class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');

    this.frameRate = 1000;

    this.generating = true;

    this.generator;
  }

  draw() {
    if (this.generator) {
      this.generator.draw(this.ctx);
    }
  }

  begin() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.generating) {
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
        this.draw();
      }, 1000 / this.frameRate)
    } else {
      $("button").prop("disabled", false);
    }
  }
}



module.exports = Maze;
