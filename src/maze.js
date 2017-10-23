const GenerateDFS = require('./generate/dfs.js');
const GenerateSidewinder = require('./generate/sidewinder.js');

class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 50;
    this.ctx = canvas.getContext('2d');

    this.generating = true;

    // this.generator = new GenerateDFS(this);
    this.generator = new GenerateSidewinder(this);
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
      const frameRate = 100;
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
        this.draw();
      }, 1000 / frameRate)
    }
  }
}



module.exports = Maze;
