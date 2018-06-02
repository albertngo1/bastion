import Cell from '../../cell.js';

class Generator {
  constructor(maze) {
    this.maze = maze;
    maze.cells = [];
    this.createCells(maze);
  }

  createCells(maze) {
    const rows = maze.h / maze.len;
    const cols = maze.w / maze.len;
    let x;
    let y;

    for (let i=0; i < rows; i++) {
      maze.cells[i] = [];
      for (let j=0; j < cols; j++) {
        x = (j * maze.len);
        y = (i * maze.len);
        maze.cells[i].push(new Cell(x, y, maze.len));
        maze.cells[i][j].frontier = false;
        maze.cells[i][j].visited = false;
      }
    }
  }

  draw(ctx) {
    const maze = this.maze;
    if (maze.fast === true) {
      this.fastAlgo();
    } else {
      this.slowAlgo();
    }
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });
    if (this.current) {
      if (maze.generating) {
        this.current.highlight(ctx);
      }
    }
    ctx.strokeRect(0, 0, maze.w, maze.h);
  }
}

export default Generator;
