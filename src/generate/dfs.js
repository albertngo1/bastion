const Cell = require('../cell.js');

class GenerateDFS {

  constructor(maze) {
    this.maze = maze;
    this.createCells(maze);

    maze.current = maze.cells[Math.floor(Math.random() * maze.cells.length)];
    maze.current.visited = true;
    maze.stack = [];
    maze.start = maze.current;

  }

  createCells(maze) {
    const rows = maze.h / maze.len;
    const cols = maze.w / maze.len;
    let x;
    let y;

    for (let i=0; i < rows; i++) {
      for (let j=0; j < cols; j++) {
        x = (j * maze.len)
        y = (i * maze.len)
        maze.cells.push(new Cell(x, y, maze.len));
      }
    }
  }

  draw(ctx) {
    const maze = this.maze;
    ctx.clearRect(0, 0, maze.w, maze.h);
    maze.cells.forEach( cell => {
      cell.draw(ctx);
    });

    const next = maze.adjacentCells(maze.current);
    if (next) {
      next.visited = true;

      maze.stack.push(maze.current);

      maze.current.removeWalls(next);


      maze.current = next;
    } else if (maze.stack.length > 0) {
      maze.current = maze.stack.pop();
      if (maze.start === maze.current) {
        maze.generating = false;
      }
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }


}

module.exports = GenerateDFS;
