import Solver from './sol.js';

class SolveDFS extends Solver {
  constructor(maze) {
    super(maze);

    this.start.parent = null;
    this.current = this.start;
    this.stack = [];
  }

  algorithm() {
    const maze = this.maze;
    if (this.current !== this.finish) {
      const neighbors = this.adjacentCells(this.current);
      if (neighbors) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        next.explored = true;
        this.stack.push(this.current);
        this.current = next;
      } else if (this.stack.length > 0) {
        this.current.backtrack = true;
        this.current = this.stack.pop();
      }
    }
  }

  path() {
    if (this.stack.length > 0) {
      this.stack.pop().path = true;
    } else {
      this.maze.solving = false;
      this.maze.solved = true;
    }
  }
}

export default SolveDFS;
