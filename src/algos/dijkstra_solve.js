class SolveDijkstra {

  constructor(maze) {
    this.maze = maze;

    this.start = maze.cells[0][0];
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
    this.set = [];
    maze.cells.forEach(row => {
      row.forEach(cell => {
        cell.distance = 1/0;
        cell.parent = null;
        this.set.push(cell);
      })
    })

    this.start.distance = 0;
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
    return neighbors;
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
    if (this.set.length > 0) {
      this.set.sort((a,b) => b.distance - a.distance);
      this.current = this.set.pop();
      this.current.explored = true;
      const neighbors = this.adjacentCells(this.current);
      for (let i=0; i < neighbors.length; i++) {
        let dist = this.current.distance + Math.sqrt(Math.pow(neighbors[i].x - this.current.x, 2) + Math.pow(neighbors[i].y - this.current.y, 2))
        if (dist < neighbors[i].distance) {
          neighbors[i].distance = dist;
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
    ctx.strokeRect(0, 0, maze.w, maze.h);
  }


}

module.exports = SolveDijkstra;
