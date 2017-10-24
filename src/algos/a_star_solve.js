class SolveAStar {

  constructor(maze) {
    this.maze = maze;

    this.start = maze.cells[0][0];
    this.start.f = 0;
    this.start.g = 0;
    this.start.h = 0;
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];

    this.open = [this.start];
    this.closed = [];
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
    const add = [];

    if (!cell.walls[0]) {
      add.push([0, -maze.len])
    }
    if (!cell.walls[1]) {
      add.push([maze.len, 0])
    }
    if (!cell.walls[2]) {
      add.push([0, maze.len])
    }
    if (!cell.walls[3]) {
      add.push([-maze.len, 0])
    }

    for (let i=0; i < add.length; i++) {
      x = cell.x + add[i][0];
      y = cell.y + add[i][1];
      let neighborCell = this.findCell(x, y);
      if (inBounds() && neighborCell && !neighborCell.explored) {
        neighborCell.parent = cell;
        neighbors.push(neighborCell);
      }
    }
    if (neighbors.length > 0) {
      return neighbors;
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

  algorithm() {
    const maze = this.maze;
    if (this.current !== this.finish) {
      if (this.open.length > 0) {
        this.open.sort((a,b) => b.f - a.f);
        this.current = this.open.pop();
        this.current.explored = true;
        const neighbors = this.adjacentCells(this.current);
        if (neighbors) {
          for (let i=0; i < neighbors.length; i++) {
            if (neighbors[i] === this.finish) {
              this.current = neighbors[i];
              return;
            }
            neighbors[i].g = this.current.g + Math.sqrt(Math.pow(neighbors[i].x - this.current.x, 2) + (neighbors[i].y - this.current.y, 2));
            neighbors[i].h = Math.abs(neighbors[i].x - this.finish.x) + Math.abs(neighbors[i].y - this.finish.y);
            neighbors[i].f = neighbors[i].g + neighbors[i].h;
            const openListCell = this.neighborExist(neighbors[i], this.open);
            const closedListCell = this.neighborExist(neighbors[i], this.closed);
            if (openListCell) {
              if (neighbors[i].f > openListCell.f) {

              }
            } else if (closedListCell) {
              if (neighbors[i].f > openListCell.f) {

              }
            } else {
              this.open.push(neighbors[i]);
            }
            this.closed.push(this.current);
          }
        }
      }
    } else {
      this.maze.solving = false;
      this.maze.solved = true;
    }
  }
  neighborExist(neighbor, list) {
    for (let i=0; i < list.length; i++) {
      let cell = list[i];
      if (cell.x === neighbor.x && cell.y === neighbor.y) {
        return cell;
      }
    }
    return false;
  }

  path() {
    if (this.pathfinder === this.start) {
      this.maze.solving = false;
      this.maze.solved = true;
    } else if (!this.pathfinder) {
      this.pathfinder = this.finish.parent;
    } else {
      this.pathfinder.path = true;
      this.pathfinder = this.pathfinder.parent;
    }
  }

  draw(ctx) {
    const maze = this.maze;
    if (this.current === this.finish) {
      this.path();
    } else {
      this.algorithm();
    }
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });
    this.current.highlight(ctx);
    this.start.highlightStart(ctx);
    this.finish.highlightEnd(ctx);
  }


}

module.exports = SolveAStar;
