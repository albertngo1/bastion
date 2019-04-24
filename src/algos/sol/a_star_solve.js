import Solver from './sol.js';

class SolveAStar extends Solver {
  constructor(maze) {
    super(maze);

    this.start.f = 0;
    this.start.g = 0;
    this.start.h = 0;
    this.open = [this.start];
    this.closed = [];
  }

  algorithm() {
    if (this.current !== this.finish) {
      if (this.open.length > 0) {
        this.open.sort((a,b) => b.f - a.f);
        this.current = this.open.pop();
        this.current.explored = true;
        const neighbors = this.adjacentCells(this.current);
        if (neighbors) {
          neighbors.forEach(neighbor => {
            neighbor.parent = this.current;
          });
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
            if (!openListCell || !closedListCell) {
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
}

export default SolveAStar;
