const Maze = require('./maze.js');


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;

  const maze = new Maze(canvas).begin();

})
