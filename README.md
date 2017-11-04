# Bastion

[Live](https://albertngo1.github.io/bastion/)

## Background
`Bastion` is a JavaScript visualization project that utilizes many popular graph algorithms to generate and solve mazes.

All of the different options are randomly generating and solving.

Maze generating algorithms include:
* Depth-first-search
* Prim's algorithm
* Kruskal's algorithm
* Sidewinder

Maze solving algorithms include:
* Depth-first-search
* Breadth-first-search
* A* search algorithm
* Dijkstra's algorithm

![alt text](/assets/example.gif)

## How It Works

The structure of the project focuses around having a `Maze` object that takes in a `Maze Generator` object and a `Maze Solver` object, with event handlers to assign the different algorithms to be used and displayed on the canvas.

The most frustrating part of the project was to develop the logic to allow for maze generating to occur with no unwanted intervention and subsequently for maze solving to occur seamlessly. The repainting of the canvas has to be consistent with the logic and the algorithms as well.

### The Algorithms

#### Depth-First-Search
  DFS traverses a particular path until it has no more paths to explore. If the pathfinder arrives at an intersection with multiple paths, it will select at path at random. At that point, it will backtrack to an earlier intersection of the maze and go down a different route.

  The core functionality of DFS relies on the stack to ensure that the furthest "branches" of the maze have been explored before going back to the earlier intersections.

```javascript
const next = this.adjacentCells(this.current);
if (next) {
  next.visited = true;
  this.stack.push(this.current);
  this.current.removeWalls(next);
  this.current = next;
} else if (this.stack.length > 0) {
  this.current = this.stack.pop();
  if (this.start === this.current) {
    maze.generating = false;
  }
}
```

#### Breadth-First-Search

BFS visits all adjacent cells of the current cell before making the subsequent adjacent cells each be the next current cell to repeat the process.

```javascript
const neighbors = this.adjacentCells(this.current);
if (neighbors) {
  neighbors.forEach(neighbor => {
    neighbor.parent = this.current;
    this.queue.push(neighbor);
  })
}
let next = this.queue.shift();
next.explored = true;
this.current = next;
```

#### Prim's Algorithm

Prim's application for maze generation revolves around selecting unexplored "neighbors" of already explored paths (or cells) of the maze. These "neighbors", labeled as the frontier cells, are selected at random carving a path for the maze.

#### Kruskal's Algorithm

A random take of the greedy algorithm, the algorithm gathers all the existing edges of the maze and divides each cell into its own unique set. As edges are taken out one by one (from an array), the two cells that have ownership of that edge will be merged into one set. This process repeats until the array containing the edges are empty, or when there exists only one set left.

A tree data structure was implemented to control the sets, as it's simple to find the root of a set by appending a tree to another tree.

#### Sidewinder

Sidewinder starts from the top left and finishes at the bottom right. It works across each row, carving a path east, building a collection of row cells. There is a random chance of the path carving north, at which point the collection empties and a new collection starts at the next cell on the right, or the left furthest of the next row.

#### A* Search Algorithm

A* search takes a heuristic approach in finding the final destination. There are three properties that each cell has: `g` which is the distance from the current cell's `g` plus the distance between the next cell to the current cell. `h` is the distance between next cell to the final destination. `g` and `h` are summed to give `f`, for which the lowest `f` is selected from an array of unexplored cells.

#### Dijkstra's Algorithm

Dijkstra's algorithm has a similar approach to A*, however it uses the distances between the current cell and its neighbor cells to determine the path to go. This algorithm may not be visualized to its fullest extent due to the neighbor cells between equidistant to the current cell.

## Tech

- HTML5 Canvas
- jQuery
