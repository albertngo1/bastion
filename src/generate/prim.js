const Cell = require('../cell.js');

class GeneratePrim {

  constructor(maze) {
    this.maze = maze;

    this.frontier = [];

    this.grid = [];

    this.createCells(maze);

    const row = this.grid.length;
    const cols = this.grid[0].length;
    this.mark(Math.floor(Math.random() * cols), Math.floor(Math.random() * row));
  }

  createCells(maze) {
    const rows = maze.h / maze.len;
    const cols = maze.w / maze.len;
    let x;
    let y;

    for (let i=0; i < rows; i++) {
      this.grid[i] = [];
      for (let j=0; j < cols; j++) {
        x = (j * maze.len)
        y = (i * maze.len)
        this.grid[i].push(new Cell(x, y, maze.len));
        this.grid[i][j].frontier = false;
        this.grid[i][j].in = false;
      }
    }
  }

  addFrontier(x, y) {
    if (x >= 0 && y >= 0 && x < this.grid[0].length && y < this.grid.length && this.grid[y][x].frontier === false && this.grid[y][x].in === false) {
      this.grid[y][x].frontier = true;
      this.frontier.push([x, y])
    }
  }

  mark(x, y) {
    this.grid[y][x].in = true;
    this.addFrontier(x + 1, y);
    this.addFrontier(x - 1, y);
    this.addFrontier(x, y + 1);
    this.addFrontier(x, y - 1);
  }

  direction(x, y, nx, ny) {
    if (x < nx) {
      return "E";
    }
    if (x > nx) {
      return "W";
    }
    if (y < ny) {
      return "S";
    }
    if (y > ny) {
      return "N";
    }
  }

  neighbors(x, y) {
    let neighbors = [];

    if (x > 0 && this.grid[y][x-1].in) {
      neighbors.push([x - 1, y]);
    };
    if (x + 1 < this.grid[0].length && this.grid[y][x+1].in) {
      neighbors.push([x + 1, y]);
    };
    if (y > 0 && this.grid[y - 1][x].in) {
      neighbors.push([x, y - 1]);
    };
    if (y + 1 < this.grid.length && this.grid[y + 1][x].in) {
      neighbors.push([x, y + 1]);
    };

    return neighbors;

  }

  algorithm() {
    if (this.frontier.length > 0) {

      const index = Math.floor(Math.random() * this.frontier.length);
      const randFrontier = this.frontier[index];

      const x = randFrontier[0];
      const y = randFrontier[1];
      this.frontier.splice(index, 1);

      const neighbors = this.neighbors(x, y);

      const randNeighbor = Math.floor(Math.random() * neighbors.length);
      const nx = neighbors[randNeighbor][0];
      const ny = neighbors[randNeighbor][1];
      const dir = this.direction(x, y, nx, ny);

      if (dir === "N") {
        this.grid[y][x].walls[0] = false;
        this.grid[ny][nx].walls[2] = false;
      } else if (dir === "S") {
        this.grid[y][x].walls[2] = false;
        this.grid[ny][nx].walls[0] = false;
      } else if (dir === "E") {
        this.grid[y][x].walls[1] = false;
        this.grid[ny][nx].walls[3] = false;
      } else {
        this.grid[y][x].walls[3] = false;
        this.grid[ny][nx].walls[1] = false;
      }
      this.grid[y][x].visited = true;
      this.grid[ny][nx].visited = true;

      this.mark(x, y)
    } else {
      this.maze.generating = false;
    }
  }

  draw(ctx) {
    const maze = this.maze;
    this.algorithm();
    this.grid.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });
    ctx.strokeRect(0, 0, maze.w, maze.h);
  }

}

module.exports = GeneratePrim;
