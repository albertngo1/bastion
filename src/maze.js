const Cell = require('./cell.js');

class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');
    this.cells = [];
    this.createCells();
    this.current = this.cells[Math.floor(Math.random() * this.cells.length)];
    this.current.visited = true;
    this.draw();
  }

  createCells() {
    const rows = this.h / this.len;
    const cols = this.w / this.len;
    let x;
    let y;

    for (let i=0; i < rows; i++) {
      for (let j=0; j < cols; j++) {
        x = (j * this.len)
        y = (i * this.len)
        this.cells.push(new Cell(x, y, this.len));
      }
    }
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
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.cells.forEach( cell => {
      cell.draw(this.ctx);
    });

    const next = this.adjacentCells(this.current);
    if (next) {
      next.visited = true;

      this.current.removeWalls(next);


      this.current = next;
    }
  }

  animateDFS() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    const frameRate = 1000;
    setTimeout(() => {
      requestAnimationFrame(this.animate.bind(this));
      this.draw();
    }, 1000 / frameRate)
  }
}



module.exports = Maze;
