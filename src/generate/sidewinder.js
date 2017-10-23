const Cell = require('../cell.js');

class GenerateSidewinder {

  constructor(maze) {
    this.maze = maze;
    maze.cells = [];

    this.createCells(maze);

    maze.current = maze.cells[0][0];

    this.algorithm();

  }

  createCells(maze) {
    const rows = maze.h / maze.len;
    const cols = maze.w / maze.len;
    let x;
    let y;

    for (let i=0; i < rows; i++) {
      maze.cells[i] = [];
      for (let j=0; j < cols; j++) {
        x = (j * maze.len)
        y = (i * maze.len)
        maze.cells[i].push(new Cell(x, y, maze.len));
      }
    }
  }

  algorithm() {
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
      }
    }
  }

  draw(ctx) {
    const maze = this.maze;
    ctx.clearRect(0, 0, maze.w, maze.h);
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });

    // this.algorithm();
  }


}

module.exports = GenerateSidewinder;
