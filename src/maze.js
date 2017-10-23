const GenerateDFS = require('./generate/dfs.js');
const GenerateSidewinder = require('./generate/sidewinder.js');
const GenerateKruskal = require('./generate/kruskal.js');

class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');

    this.frameRate = 1000;

    this.generating = true;

    this.generator = new GenerateKruskal(this);
    // this.generator = new GenerateDFS(this);
    // this.generator = new GenerateSidewinder(this);
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
    }
  }
}



module.exports = Maze;
