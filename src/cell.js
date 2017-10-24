class Cell {

  constructor(x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    // north east south west
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  removeWalls(other) {

    let x = this.x - other.x;
    let y = this.y - other.y;

    if (x < 0) {
      this.walls[1] = false;
      other.walls[3] = false;
    } else if (x > 0) {
      this.walls[3] = false;
      other.walls[1] = false;
    }

    if (y < 0) {
      this.walls[2] = false;
      other.walls[0] = false;
    } else if (y > 0) {
      this.walls[0] = false;
      other.walls[2] = false;
    }

  }

  draw(ctx) {
    const x = this.x
    const y = this.y
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (this.walls[0]) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.len, y);
      ctx.stroke();
    }
    if (this.walls[1]) {
      ctx.beginPath();
      ctx.moveTo(x + this.len, y);
      ctx.lineTo(x + this.len, y + this.len);
      ctx.stroke();
    }
    if (this.walls[2]) {
      ctx.beginPath();
      ctx.moveTo(x, y + this.len);
      ctx.lineTo(x + this.len, y + this.len);
      ctx.stroke();
    }
    if (this.walls[3]) {
      ctx.beginPath();
      ctx.moveTo(x, y + this.len);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (this.visited) {
      ctx.fillStyle = "pink";
      ctx.fillRect(x, y, this.len, this.len);
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, this.len, this.len);
    }

    if (this.in) {
      ctx.fillStyle = "pink";
      ctx.fillRect(x, y, this.len, this.len);
    } else if (this.frontier) {
      ctx.fillStyle = "teal";
      ctx.fillRect(x, y, this.len, this.len);
    }

    if (this.explored) {
      ctx.fillStyle = "rgb(221, 56, 199)";
      ctx.fillRect(x, y, this.len, this.len);
    }
    if (this.path) {
      ctx.fillStyle = "#77e7cf";
      ctx.fillRect(x, y, this.len, this.len);
    }
  }

  highlight(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.len, this.len);
  }

  highlightStart(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.len, this.len);
  }
  highlightEnd(ctx) {
    ctx.fillStyle = "#64fbee";
    ctx.fillRect(this.x, this.y, this.len, this.len);
  }

}

module.exports = Cell;
