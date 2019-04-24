import Solver from './sol.js';

class SolveBFS extends Solver {
  constructor(maze) {
    super(maze);

    this.current = this.start;
    this.queue = [];
  }

  algorithm() {
    if (this.current !== this.finish) {
      const neighbors = this.adjacentCells(this.current);
      if (neighbors) {
        neighbors.forEach(neighbor => {
          neighbor.parent = this.current;
          this.queue.push(neighbor);
        });
      }
      let next = this.queue.shift();
      next.explored = true;
      this.current = next;
    }
  }
}

export default SolveBFS;
