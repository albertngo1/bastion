
class Cell {

  constructor(x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.walls = ["N", "W", "S", "E"];
    this.visited = false;
  }

  draw(ctx) {
    const x = this.x
    const y = this.y
    ctx.strokeStyle = "black";
    ctx.rect(x, y, this.len, this.len);
    ctx.stroke();
  }

}

module.exports = Cell;
