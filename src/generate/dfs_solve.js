

class SolveDFS {

  constructor(maze) {
    this.maze = maze;


    this.start = maze.cells[0][0];
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
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
      let cell = maze.cells[i];
      if (cell.x === x && cell.y === y) {
        return cell;
      }
    }
    return null;
  }

  algorithm() {
    const maze = this.maze;
    const next = this.adjacentCells(maze.current);
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
    }
  }

  draw(ctx) {
    const maze = this.maze;
    // this.algorithm();
    this.start.highlightStart(ctx);
    this.finish.highlightEnd(ctx);
  }


}

module.exports = SolveDFS;
