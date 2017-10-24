class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');

    this.frameRate = 1000;

    this.generating;
    this.solving = false;

    this.generator;
    this.solver;
  }

  draw() {
    if (this.generator) {
      this.generator.draw(this.ctx);
    }
  }

  solve() {
    this.solver.draw(this.ctx);
  }

  begin() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.generating || this.solving) {
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
        this.draw();
        if (this.solving) {
          this.solve();
        }
      }, 1000 / this.frameRate)
      console.log(this.generating)
    } else {
      $("button").prop("disabled", false);
      console.log(this.generator)
      console.log(this.generating)
    }
  }
}



module.exports = Maze;
