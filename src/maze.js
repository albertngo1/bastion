const GenerateDFS = require('./generate/dfs.js');

class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 100;
    this.ctx = canvas.getContext('2d');
    this.cells = [];

    this.generating = true;

    this.generator = new GenerateDFS(this);
  }

  adjacentCells(cell) {
    const inBounds = () => {
        if (this.x < 0 || this.x > this.w || this.y < 0 || this.y > this.h) {
          return false;
        } else {
          return true;
        }
      }


    let neighbors = [];
    let x;
    let y;
    const add = [[-this.len, 0],[this.len, 0], [0, this.len], [0, -this.len]];

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
    for (let i=0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      if (cell.x === x && cell.y === y) {
        return cell;
      }
    }
    return null;
  }

  draw() {
    if (this.generator) {
      this.generator.draw(this.ctx);
    }
  }

  begin() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.generating) {
      const frameRate = 1000;
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
        this.draw();
      }, 1000 / frameRate)
    }
  }
}



module.exports = Maze;
