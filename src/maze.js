const Cell = require('./cell.js');

class Maze {

  constructor(canvas) {
    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 100;
    this.ctx = canvas.getContext('2d');
    this.cells = [];
    this.createCells();
    this.selectStart();
    this.neighbors = this.adjacentCells(this.start)
    this.draw();
  }

  selectStart() {
    const cell = this.cells[Math.floor(Math.random() * this.cells.length)];
    this.start = cell;
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
    let neighbors = [];
    let x;
    let y;
    const add = [[-this.len, 0],[this.len, 0], [0, this.len], [0, -this.len]];

    for (let i=0; i < add.length; i++) {
      x = cell.x + add[i][0];
      y = cell.y + add[i][1];
      let neighborCell = this.findCell(x, y);
      if (this.inBounds() && neighborCell) {
        neighbors.push(neighborCell);
      }
    }
    return neighbors;
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

  inBounds() {
    if (this.x < 0 || this.x > this.w || this.y < 0 || this.y > this.h) {
      return false;
    } else {
      return true;
    }
  }

  draw() {
    this.cells.forEach( cell => {
      cell.draw(this.ctx);
    })

    this.neighbors.forEach( cell => {
      const x = cell.x;
      const y = cell.y;
      this.ctx.fillStyle = "yellow";
      this.ctx.fillRect(x, y, cell.len, cell.len);
    })
  }
}



module.exports = Maze;
