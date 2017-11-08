const Generator = require('./generator.js');

class GenerateSidewinder extends Generator {

  constructor(maze) {
    super(maze);

    this.currentIdx = {x: 0, y: 0}
    this.runStart = 0;
  }

  slowAlgo() {
    const maze = this.maze;
    const height = maze.cells.length;
    const width = maze.cells[0].length;
    if (this.currentIdx.y < maze.cells.length) {
      if (this.currentIdx.x === width) {
        this.currentIdx.x = 0;
        this.currentIdx.y += 1;
        if (this.currentIdx.y === height) {
          return this.maze.generating = false;
        }
      }
      let x = this.currentIdx.x;
      let y = this.currentIdx.y;
      if (x === 0) {
        this.runStart = 0;
      }
      if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
        let cell = this.runStart + Math.floor(Math.random() * (x - this.runStart));
        maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
        this.runStart = x + 1;
      } else if (x + 1 < width) {
        maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
      }
      maze.cells[y][x].visited = true;
      this.currentIdx.x += 1;
    }
  }

  fastAlgo() {
    const maze = this.maze;
    const height = maze.cells.length;
    const width = maze.cells[0].length;
    let runStart;
    let cell;

    for (let y=0; y < height; y++) {
      runStart = 0;
      for (let x=0; x < width; x++) {
        if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
          cell = runStart + Math.floor(Math.random() * (x - runStart + 1));
          maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
          runStart = x + 1;
        } else if (x + 1 < width) {
          maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
        }
        maze.cells[y][x].visited = true;
      }
    }
    maze.generating = false;
  }


}

module.exports = GenerateSidewinder;
