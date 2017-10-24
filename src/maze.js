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
    if (this.solver) {
      this.solver.draw(this.ctx);
    }
  }

  begin() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.generating || this.solving) {
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
        if (this.generating) {
          this.draw();
        } else {
          this.generator = null;
        }
        if (this.solving) {
          this.solve();
        } else {
          this.solver = null;
        }
        if (!this.generating && !this.solving) {
          $("button").prop("disabled", false);
        }
      }, 1000 / this.frameRate)
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}



module.exports = Maze;
