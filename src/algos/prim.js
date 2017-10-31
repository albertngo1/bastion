const Cell = require('../cell.js');

class GeneratePrim {

  constructor(maze) {
    this.maze = maze;

    this.frontier = [];

    maze.cells = [];

    this.createCells(maze);

    const row = maze.cells.length;
    const cols = maze.cells[0].length;
    this.mark(Math.floor(Math.random() * cols), Math.floor(Math.random() * row));
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
        maze.cells[i][j].frontier = false;
        maze.cells[i][j].in = false;
      }
    }
  }

  addFrontier(x, y) {
    const maze = this.maze;
    if (x >= 0 && y >= 0 && x < maze.cells[0].length && y < maze.cells.length && maze.cells[y][x].frontier === false && maze.cells[y][x].in === false) {
      maze.cells[y][x].frontier = true;
      this.frontier.push([x, y])
    }
  }

  mark(x, y) {
    const maze = this.maze;
    maze.cells[y][x].in = true;
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
    const maze = this.maze;
    let neighbors = [];

    if (x > 0 && maze.cells[y][x-1].in) {
      neighbors.push([x - 1, y]);
    };
    if (x + 1 < maze.cells[0].length && maze.cells[y][x+1].in) {
      neighbors.push([x + 1, y]);
    };
    if (y > 0 && maze.cells[y - 1][x].in) {
      neighbors.push([x, y - 1]);
    };
    if (y + 1 < maze.cells.length && maze.cells[y + 1][x].in) {
      neighbors.push([x, y + 1]);
    };

    return neighbors;

  }

  algorithm() {
    const maze = this.maze;
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
        maze.cells[y][x].walls[0] = false;
        maze.cells[ny][nx].walls[2] = false;
      } else if (dir === "S") {
        maze.cells[y][x].walls[2] = false;
        maze.cells[ny][nx].walls[0] = false;
      } else if (dir === "E") {
        maze.cells[y][x].walls[1] = false;
        maze.cells[ny][nx].walls[3] = false;
      } else {
        maze.cells[y][x].walls[3] = false;
        maze.cells[ny][nx].walls[1] = false;
      }
      maze.cells[y][x].visited = true;
      maze.cells[ny][nx].visited = true;

      this.mark(x, y);
    } else {
      this.maze.generating = false;
    }
  }

  fastAlgo() {
    const maze = this.maze;
    while (this.frontier.length > 0) {
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
        maze.cells[y][x].walls[0] = false;
        maze.cells[ny][nx].walls[2] = false;
      } else if (dir === "S") {
        maze.cells[y][x].walls[2] = false;
        maze.cells[ny][nx].walls[0] = false;
      } else if (dir === "E") {
        maze.cells[y][x].walls[1] = false;
        maze.cells[ny][nx].walls[3] = false;
      } else {
        maze.cells[y][x].walls[3] = false;
        maze.cells[ny][nx].walls[1] = false;
      }
      maze.cells[y][x].visited = true;
      maze.cells[ny][nx].visited = true;

      this.mark(x, y);
    }
    maze.generating = false;

  }

  draw(ctx) {
    const maze = this.maze;
    if (maze.fast === true) {
      this.fastAlgo();
    } else {
      this.algorithm();
    }
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });
    ctx.strokeRect(0, 0, maze.w, maze.h);
  }

}

module.exports = GeneratePrim;
