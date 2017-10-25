# Maezr

[Live](https://albertngo1.github.io/maezr/)

## Background
`Maezr` is a JavaScript visualization project that utilizes many popular graph algorithms to generate and solve mazes.

All of the different options are randomly generating and solving.

Maze generating algorithms include:
* Depth-first-search
* Prim's algorithm
* Krukal's algorithm
* Sidewinder

Maze solving algorithms include:
* Depth-first-search
* Prim's algorithm
* A* search algorithm
* Dijkstra's algorithm

![alt text](/assets/example.gif)

## How It Works

The structure of the project focuses around having a `Maze` object that takes in a `Maze Generator` object and a `Maze Solver` object, with event handlers to assign the different algorithms to be used and displayed on the canvas.

The most frustrating part of the project was to develop the logic to allow for maze generating to occur with no unwanted intervention and subsequently for maze solving to occur seamlessly. The repainting of the canvas has to be consistent with the logic and the algorithms as well.

## More About The Algorithms

```javascript

```

## Tech

- HTML5 Canvas
- jQuery
