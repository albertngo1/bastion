import Solver from './sol.js';

class SolveDijkstra extends Solver {
  constructor(maze) {
    super(maze);

    this.set = [];
    maze.cells.forEach(row => {
      row.forEach(cell => {
        cell.distance = 1/0;
        cell.parent = null;
        this.set.push(cell);
      });
    });

    this.start.distance = 0;
  }

  algorithm() {
    if (this.set.length > 0) {
      this.set.sort((a,b) => b.distance - a.distance);
      this.current = this.set.pop();
      this.current.explored = true;
      const neighbors = this.adjacentCells(this.current);
      if (neighbors) {
        neighbors.forEach(neighbor => {
          neighbor.parent = this.current;
        });
      }
      for (let i=0; i < neighbors.length; i++) {
				const dist = this.current.distance + Math.sqrt(Math.pow(neighbors[i].x - this.current.x, 2) + Math.pow(neighbors[i].y - this.current.y, 2));
        if (dist < neighbors[i].distance) {
          neighbors[i].distance = dist;
        }
      }
    } else {
      this.maze.solving = false;
      this.maze.solved = true;
    }
  }
}

export default SolveDijkstra;
