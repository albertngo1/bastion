const Generator = require('./generator.js');

class GenerateDFS extends Generator {

  constructor(maze) {
    super(maze);
    const y = Math.floor(Math.random() * maze.cells.length)
    const x = Math.floor(Math.random() * maze.cells[0].length)
    this.current = maze.cells[y][x];
    this.current.visited = true;
    this.stack = [];
    this.start = this.current;

  }

  adjacentCells(cell) {
    const maze = this.maze;
    const inBounds = () => {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      }
    let neighbors = [];
    let x;
    let y;
    const add = [[-maze.len, 0],[maze.len, 0], [0, maze.len], [0, -maze.len]];

    for (let i=0; i < add.length; i++) {
      x = cell.x + add[i][0];
      y = cell.y + add[i][1];
      let neighborCell = this.findCell(x, y);
      if (inBounds() && neighborCell && !neighborCell.visited) {
        neighbors.push(neighborCell);
      }
    }
    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
  }

  findCell(x, y) {
    const maze = this.maze
    for (let i=0; i < maze.cells.length; i++) {
      for (let j=0; j < maze.cells[0].length; j++) {
        let cell = maze.cells[i][j];
        if (cell.x === x && cell.y === y) {
          return cell;
        }
      }
    }
    return null;
  }

  slowAlgo() {
    const maze = this.maze;
    const next = this.adjacentCells(this.current);
    if (next) {
      next.visited = true;
      this.stack.push(this.current);
      this.current.removeWalls(next);
      this.current = next;
    } else if (this.stack.length > 0) {
      this.current.backtrack = true;
      this.current = this.stack.pop();
      if (this.start === this.current) {
        maze.generating = false;
      }
    }
  }

  fastAlgo() {
    const maze = this.maze;
    while (true) {
      const next = this.adjacentCells(this.current);
      if (next) {
        next.visited = true;
        this.stack.push(this.current);
        this.current.removeWalls(next);
        this.current = next;
      } else if (this.stack.length > 0) {
        this.current.backtrack = true;
        this.current = this.stack.pop();
        if (this.start === this.current) {
          maze.generating = false;
          return;
        }
      }
    }
  }


}

module.exports = GenerateDFS;
