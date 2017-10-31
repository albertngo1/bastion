/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(x, y, len) {
    _classCallCheck(this, Cell);

    this.x = x;
    this.y = y;
    this.len = len;
    // north east south west
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  _createClass(Cell, [{
    key: "removeWalls",
    value: function removeWalls(other) {

      var x = this.x - other.x;
      var y = this.y - other.y;

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
  }, {
    key: "draw",
    value: function draw(ctx) {
      var x = this.x;
      var y = this.y;
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
      } else if (this.frontier) {
        ctx.fillStyle = "teal";
        ctx.fillRect(x, y, this.len, this.len);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, this.len, this.len);
      }

      if (this.explored) {
        ctx.fillStyle = "rgb(221, 56, 199)";
        ctx.fillRect(x, y, this.len, this.len);
      }
      if (this.path) {
        ctx.fillStyle = "#64fbee";
        ctx.fillRect(x, y, this.len, this.len);
      }
    }
  }, {
    key: "highlight",
    value: function highlight(ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.len, this.len);
    }
  }, {
    key: "highlightStart",
    value: function highlightStart(ctx) {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x, this.y, this.len, this.len);
    }
  }, {
    key: "highlightEnd",
    value: function highlightEnd(ctx) {
      ctx.fillStyle = "#64fbee";
      ctx.fillRect(this.x, this.y, this.len, this.len);
    }
  }]);

  return Cell;
}();

module.exports = Cell;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventHandle = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  EventHandle(ctx, canvas);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenerateDFS = __webpack_require__(3);
var GenerateSidewinder = __webpack_require__(4);
var GeneratePrim = __webpack_require__(5);
var GenerateKruskal = __webpack_require__(6);
var SolveDFS = __webpack_require__(8);
var SolveBFS = __webpack_require__(9);
var SolveAStar = __webpack_require__(10);
var SolveDijkstra = __webpack_require__(11);
var Maze = __webpack_require__(12);

var eventHandle = function eventHandle(ctx, canvas) {

  var maezr = new Maze(canvas);
  var gen = void 0;
  var solve = void 0;

  function eventHelper() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("button").prop("disabled", true);
    if (maezr) {
      maezr = new Maze(canvas);
    }
    maezr.solver = null;
    maezr.solved = false;
    maezr.solving = false;
    maezr.generating = true;
  }

  function fastAlgoHelper(maezr) {
    var txt = $("#instant-toggle-text").text();

    if (txt === "ON") {
      maezr.fast = true;
    }
  }

  function resetMaze(maze) {
    maze.cells.forEach(function (row) {
      row.forEach(function (cell) {
        cell.frontier = false;
        cell.explored = false;
        cell.path = false;
      });
    });
  }

  function solveHelper(maze, id) {
    $("button").prop("disabled", true);
    $(id).addClass("button-on");
    maze.solver = solve;
    maze.solving = true;
  }

  $("#instant-gen").click(function () {
    var txt = $("#instant-toggle-text").text();
    if (txt === "OFF") {
      $("#instant-toggle-text").text("ON");
    } else {
      $("#instant-toggle-text").text("OFF");
    }
  });

  $("#dfs-gen").click(function () {
    eventHelper();
    gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#dfs-gen").addClass("button-on");
    maezr.begin();
  });

  $("#prim-gen").click(function () {
    eventHelper();
    gen = new GeneratePrim(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#prim-gen").addClass("button-on");
    maezr.begin();
  });

  $("#sidewinder-gen").click(function () {
    eventHelper();
    gen = new GenerateSidewinder(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#sidewinder-gen").addClass("button-on");
    maezr.begin();
  });

  $("#kruskal-gen").click(function () {
    eventHelper();
    gen = new GenerateKruskal(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#kruskal-gen").addClass("button-on");
    maezr.begin();
  });

  $("#dfs-solve").click(function () {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveDFS(maezr);
      solveHelper(maezr, "#dfs-solve");
    }
  });

  $("#bfs-solve").click(function () {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveBFS(maezr);
      solveHelper(maezr, "#bfs-solve");
    }
  });

  $("#astar-solve").click(function () {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveAStar(maezr);
      solveHelper(maezr, "#astar-solve");
    }
  });

  $("#dijkstra-solve").click(function () {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveDijkstra(maezr);
      solveHelper(maezr, "#dijkstra-solve");
    }
  });
};

module.exports = eventHandle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GenerateDFS = function () {
  function GenerateDFS(maze) {
    _classCallCheck(this, GenerateDFS);

    this.maze = maze;
    maze.cells = [];

    this.createCells(maze);
    var y = Math.floor(Math.random() * maze.cells.length);
    var x = Math.floor(Math.random() * maze.cells[0].length);
    this.current = maze.cells[y][x];
    this.current.visited = true;
    this.stack = [];
    this.start = this.current;
  }

  _createClass(GenerateDFS, [{
    key: 'createCells',
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;
      for (var i = 0; i < rows; i++) {
        maze.cells[i] = [];
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          maze.cells[i].push(new Cell(x, y, maze.len));
        }
      }
    }
  }, {
    key: 'adjacentCells',
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [[-maze.len, 0], [maze.len, 0], [0, maze.len], [0, -maze.len]];

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.visited) {
          neighbors.push(neighborCell);
        }
      }
      if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }
    }
  }, {
    key: 'findCell',
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        for (var j = 0; j < maze.cells[0].length; j++) {
          var cell = maze.cells[i][j];
          if (cell.x === x && cell.y === y) {
            return cell;
          }
        }
      }
      return null;
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      var maze = this.maze;
      var next = this.adjacentCells(this.current);
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
    }
  }, {
    key: 'fastAlgo',
    value: function fastAlgo() {
      var maze = this.maze;
      while (true) {
        var next = this.adjacentCells(this.current);
        if (next) {
          next.visited = true;
          this.stack.push(this.current);
          this.current.removeWalls(next);
          this.current = next;
        } else if (this.stack.length > 0) {
          this.current = this.stack.pop();
          if (this.start === this.current) {
            maze.generating = false;
            return;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      if (maze.fast === true) {
        this.fastAlgo();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      if (maze.generating) {
        this.current.highlight(ctx);
      }
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateDFS;
}();

module.exports = GenerateDFS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GenerateSidewinder = function () {
  function GenerateSidewinder(maze) {
    _classCallCheck(this, GenerateSidewinder);

    this.maze = maze;
    maze.cells = [];

    this.createCells(maze);

    this.currentIdx = { x: 0, y: 0 };
    this.runStart = 0;
  }

  _createClass(GenerateSidewinder, [{
    key: 'createCells',
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < rows; i++) {
        maze.cells[i] = [];
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          maze.cells[i].push(new Cell(x, y, maze.len));
        }
      }
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      var maze = this.maze;
      var height = maze.cells.length;
      var width = maze.cells[0].length;
      if (this.currentIdx.x === width) {
        this.currentIdx.x = 0;
        this.currentIdx.y += 1;
        if (this.currentIdx.y === height) {
          return this.maze.generating = false;
        }
      }
      var x = this.currentIdx.x;
      var y = this.currentIdx.y;
      if (x === 0) {
        this.runStart = 0;
      }
      if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
        var cell = this.runStart + Math.floor(Math.random() * (x - this.runStart));
        maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
        this.runStart = x + 1;
      } else if (x + 1 < width) {
        maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
      }
      maze.cells[y][x].visited = true;
      this.currentIdx.x += 1;
    }
  }, {
    key: 'fastAlgo',
    value: function fastAlgo() {
      var maze = this.maze;
      var height = maze.cells.length;
      var width = maze.cells[0].length;
      var runStart = void 0;
      var cell = void 0;

      for (var y = 0; y < height; y++) {
        runStart = 0;
        for (var x = 0; x < width; x++) {
          if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
            cell = runStart + Math.floor(Math.random() * (x - runStart + 1));
            maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
            runStart = x + 1;
          } else if (x + 1 < width) {
            maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
          }
          maze.cells[y][x].visited = true;
        }
      }
      maze.generating = false;
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      if (maze.fast === true) {
        this.fastAlgo();
      } else {
        if (this.currentIdx.y < maze.cells.length) {
          this.algorithm();
        }
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateSidewinder;
}();

module.exports = GenerateSidewinder;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GeneratePrim = function () {
  function GeneratePrim(maze) {
    _classCallCheck(this, GeneratePrim);

    this.maze = maze;

    this.frontier = [];

    maze.cells = [];

    this.createCells(maze);

    var row = maze.cells.length;
    var cols = maze.cells[0].length;
    this.mark(Math.floor(Math.random() * cols), Math.floor(Math.random() * row));
  }

  _createClass(GeneratePrim, [{
    key: "createCells",
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < rows; i++) {
        maze.cells[i] = [];
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          maze.cells[i].push(new Cell(x, y, maze.len));
          maze.cells[i][j].frontier = false;
          maze.cells[i][j].visited = false;
        }
      }
    }
  }, {
    key: "addFrontier",
    value: function addFrontier(x, y) {
      var maze = this.maze;
      if (x >= 0 && y >= 0 && x < maze.cells[0].length && y < maze.cells.length && maze.cells[y][x].frontier === false && maze.cells[y][x].visited === false) {
        maze.cells[y][x].frontier = true;
        this.frontier.push([x, y]);
      }
    }
  }, {
    key: "mark",
    value: function mark(x, y) {
      var maze = this.maze;
      maze.cells[y][x].visited = true;
      this.addFrontier(x + 1, y);
      this.addFrontier(x - 1, y);
      this.addFrontier(x, y + 1);
      this.addFrontier(x, y - 1);
    }
  }, {
    key: "direction",
    value: function direction(x, y, nx, ny) {
      if (x < nx) {
        return "E";
      }
      if (x > nx) {
        return "W";
      }
      if (y < ny) {
        return "S";
      }
      if (y > ny) {
        return "N";
      }
    }
  }, {
    key: "neighbors",
    value: function neighbors(x, y) {
      var maze = this.maze;
      var neighbors = [];

      if (x > 0 && maze.cells[y][x - 1].visited) {
        neighbors.push([x - 1, y]);
      };
      if (x + 1 < maze.cells[0].length && maze.cells[y][x + 1].visited) {
        neighbors.push([x + 1, y]);
      };
      if (y > 0 && maze.cells[y - 1][x].visited) {
        neighbors.push([x, y - 1]);
      };
      if (y + 1 < maze.cells.length && maze.cells[y + 1][x].visited) {
        neighbors.push([x, y + 1]);
      };

      return neighbors;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      var maze = this.maze;
      if (this.frontier.length > 0) {

        var index = Math.floor(Math.random() * this.frontier.length);
        var randFrontier = this.frontier[index];

        var x = randFrontier[0];
        var y = randFrontier[1];
        this.frontier.splice(index, 1);

        var neighbors = this.neighbors(x, y);

        var randNeighbor = Math.floor(Math.random() * neighbors.length);
        var nx = neighbors[randNeighbor][0];
        var ny = neighbors[randNeighbor][1];
        var dir = this.direction(x, y, nx, ny);

        if (dir === "N") {
          maze.cells[y][x].walls[0] = false;
          maze.cells[ny][nx].walls[2] = false;
        } else if (dir === "S") {
          maze.cells[y][x].walls[2] = false;
          maze.cells[ny][nx].walls[0] = false;
        } else if (dir === "E") {
          maze.cells[y][x].walls[1] = false;
          maze.cells[ny][nx].walls[3] = false;
        } else {
          maze.cells[y][x].walls[3] = false;
          maze.cells[ny][nx].walls[1] = false;
        }
        maze.cells[y][x].visited = true;
        maze.cells[ny][nx].visited = true;

        this.mark(x, y);
      } else {
        this.maze.generating = false;
      }
    }
  }, {
    key: "fastAlgo",
    value: function fastAlgo() {
      var maze = this.maze;
      while (this.frontier.length > 0) {
        var index = Math.floor(Math.random() * this.frontier.length);
        var randFrontier = this.frontier[index];

        var x = randFrontier[0];
        var y = randFrontier[1];
        this.frontier.splice(index, 1);

        var neighbors = this.neighbors(x, y);

        var randNeighbor = Math.floor(Math.random() * neighbors.length);
        var nx = neighbors[randNeighbor][0];
        var ny = neighbors[randNeighbor][1];
        var dir = this.direction(x, y, nx, ny);

        if (dir === "N") {
          maze.cells[y][x].walls[0] = false;
          maze.cells[ny][nx].walls[2] = false;
        } else if (dir === "S") {
          maze.cells[y][x].walls[2] = false;
          maze.cells[ny][nx].walls[0] = false;
        } else if (dir === "E") {
          maze.cells[y][x].walls[1] = false;
          maze.cells[ny][nx].walls[3] = false;
        } else {
          maze.cells[y][x].walls[3] = false;
          maze.cells[ny][nx].walls[1] = false;
        }
        maze.cells[y][x].visited = true;
        maze.cells[ny][nx].visited = true;

        this.mark(x, y);
      }
      maze.generating = false;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      if (maze.fast === true) {
        this.fastAlgo();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GeneratePrim;
}();

module.exports = GeneratePrim;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);
var Tree = __webpack_require__(7);

var GenerateKruskal = function () {
  function GenerateKruskal(maze) {
    _classCallCheck(this, GenerateKruskal);

    this.N = "N";
    this.W = "W";
    this.DX = {
      "E": maze.len,
      "W": -maze.len,
      "N": 0,
      "S": 0
    };
    this.DY = {
      "S": maze.len,
      "N": -maze.len,
      "W": 0,
      "E": 0
    };

    this.maze = maze;
    this.edges = [];
    this.createGridAndSet();
    this.createEdges();
    this.algorithm();
  }

  _createClass(GenerateKruskal, [{
    key: 'createGridAndSet',
    value: function createGridAndSet() {
      var maze = this.maze;
      maze.cells = [];
      this.sets = [];
      for (var y = 0; y < maze.w / maze.len; y++) {
        maze.cells[y] = [];
        this.sets[y] = [];
        for (var x = 0; x < maze.h / maze.len; x++) {
          maze.cells[y].push(new Cell(x * maze.len, y * maze.len, maze.len));
          this.sets[y].push(new Tree());
        }
      }
    }
  }, {
    key: 'createEdges',
    value: function createEdges() {
      var maze = this.maze;
      for (var y = 0; y < maze.w / maze.len; y++) {
        for (var x = 0; x < maze.h / maze.len; x++) {
          if (y > 0) {
            this.edges.push([x * maze.len, y * maze.len, this.N]);
          }
          if (x > 0) {
            this.edges.push([x * maze.len, y * maze.len, this.W]);
          }
        }
      }
      this.edges.sort(function (a, b) {
        return 0.5 - Math.random();
      });
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      var maze = this.maze;
      if (this.edges.length > 0) {
        var poppedEdge = this.edges.pop();
        var x = poppedEdge[0];
        var y = poppedEdge[1];
        var dir = poppedEdge[2];

        var nx = x + this.DX[dir];
        var ny = y + this.DY[dir];

        var l = this.maze.len;
        var set1 = this.sets[y / l][x / l];
        var set2 = this.sets[ny / l][nx / l];
        if (!set1.connected(set2)) {

          set1.connect(set2);

          if (dir === "N") {
            maze.cells[y / l][x / l].walls[0] = false;
            maze.cells[ny / l][nx / l].walls[2] = false;
          } else if (dir === "S") {
            maze.cells[y / l][x / l].walls[2] = false;
            maze.cells[ny / l][nx / l].walls[0] = false;
          } else if (dir === "E") {
            maze.cells[y / l][x / l].walls[1] = false;
            maze.cells[ny / l][nx / l].walls[3] = false;
          } else {
            maze.cells[y / l][x / l].walls[3] = false;
            maze.cells[ny / l][nx / l].walls[1] = false;
          }
        }
        maze.cells[y / l][x / l].visited = true;
        maze.cells[ny / l][nx / l].visited = true;
      } else {
        this.maze.generating = false;
      }
    }
  }, {
    key: 'fastAlgo',
    value: function fastAlgo() {
      var maze = this.maze;
      while (this.edges.length > 0) {
        var poppedEdge = this.edges.pop();
        var x = poppedEdge[0];
        var y = poppedEdge[1];
        var dir = poppedEdge[2];

        var nx = x + this.DX[dir];
        var ny = y + this.DY[dir];

        var l = this.maze.len;
        var set1 = this.sets[y / l][x / l];
        var set2 = this.sets[ny / l][nx / l];
        if (!set1.connected(set2)) {

          set1.connect(set2);

          if (dir === "N") {
            maze.cells[y / l][x / l].walls[0] = false;
            maze.cells[ny / l][nx / l].walls[2] = false;
          } else if (dir === "S") {
            maze.cells[y / l][x / l].walls[2] = false;
            maze.cells[ny / l][nx / l].walls[0] = false;
          } else if (dir === "E") {
            maze.cells[y / l][x / l].walls[1] = false;
            maze.cells[ny / l][nx / l].walls[3] = false;
          } else {
            maze.cells[y / l][x / l].walls[3] = false;
            maze.cells[ny / l][nx / l].walls[1] = false;
          }
        }
        maze.cells[y / l][x / l].visited = true;
        maze.cells[ny / l][nx / l].visited = true;
      }
      maze.generating = false;
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      if (maze.fast === true) {
        this.fastAlgo();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateKruskal;
}();

module.exports = GenerateKruskal;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  function Tree() {
    _classCallCheck(this, Tree);

    this.parent = null;
  }

  _createClass(Tree, [{
    key: "root",
    value: function root() {
      return this.parent ? this.parent.root() : this;
    }
  }, {
    key: "connected",
    value: function connected(tree) {
      return this.root() === tree.root();
    }
  }, {
    key: "connect",
    value: function connect(tree) {
      return tree.root().parent = this;
    }
  }]);

  return Tree;
}();

module.exports = Tree;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SolveDFS = function () {
  function SolveDFS(maze) {
    _classCallCheck(this, SolveDFS);

    this.maze = maze;

    this.start = maze.cells[0][0];
    this.start.parent = null;
    this.current = maze.cells[0][0];
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
    this.stack = [];
  }

  _createClass(SolveDFS, [{
    key: "adjacentCells",
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [];

      if (!cell.walls[0]) {
        add.push([0, -maze.len]);
      }
      if (!cell.walls[1]) {
        add.push([maze.len, 0]);
      }
      if (!cell.walls[2]) {
        add.push([0, maze.len]);
      }
      if (!cell.walls[3]) {
        add.push([-maze.len, 0]);
      }

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.explored) {
          neighbors.push(neighborCell);
        }
      }
      if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }
    }
  }, {
    key: "findCell",
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        for (var j = 0; j < maze.cells[0].length; j++) {
          var cell = maze.cells[i][j];
          if (cell.x === x && cell.y === y) {
            return cell;
          }
        }
      }
      return null;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      var maze = this.maze;
      if (this.current !== this.finish) {
        var next = this.adjacentCells(this.current);
        if (next) {
          next.explored = true;
          this.stack.push(this.current);
          this.current = next;
        } else if (this.stack.length > 0) {
          this.current = this.stack.pop();
        }
      }
    }
  }, {
    key: "path",
    value: function path() {
      if (this.stack.length > 0) {
        this.stack.pop().path = true;
      } else {
        this.maze.solving = false;
        this.maze.solved = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      this.algorithm();
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      this.current.highlight(ctx);
      this.start.highlightStart(ctx);
      this.finish.highlightEnd(ctx);
      if (this.current === this.finish) {
        this.path();
      }
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return SolveDFS;
}();

module.exports = SolveDFS;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SolveBFS = function () {
  function SolveBFS(maze) {
    _classCallCheck(this, SolveBFS);

    this.maze = maze;

    this.start = maze.cells[0][0];
    this.current = this.start;
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
    this.queue = [];
  }

  _createClass(SolveBFS, [{
    key: "adjacentCells",
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [];
      if (!cell.walls[0]) {
        add.push([0, -maze.len]);
      }
      if (!cell.walls[1]) {
        add.push([maze.len, 0]);
      }
      if (!cell.walls[2]) {
        add.push([0, maze.len]);
      }
      if (!cell.walls[3]) {
        add.push([-maze.len, 0]);
      }

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.explored) {
          neighbors.push(neighborCell);
        }
      }
      if (neighbors.length > 0) {
        return neighbors;
      }
    }
  }, {
    key: "findCell",
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        for (var j = 0; j < maze.cells[0].length; j++) {
          var cell = maze.cells[i][j];
          if (cell.x === x && cell.y === y) {
            return cell;
          }
        }
      }
      return null;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      var _this = this;

      var maze = this.maze;
      if (this.current !== this.finish) {
        var neighbors = this.adjacentCells(this.current);
        if (neighbors) {
          neighbors.forEach(function (neighbor) {
            neighbor.parent = _this.current;
            _this.queue.push(neighbor);
          });
        }
        var next = this.queue.shift();
        next.explored = true;
        this.current = next;
      }
    }
  }, {
    key: "path",
    value: function path() {
      if (this.pathfinder === this.start) {
        this.maze.solving = false;
        this.maze.solved = true;
      } else if (!this.pathfinder) {
        this.pathfinder = this.finish.parent;
      } else {
        this.pathfinder.path = true;
        this.pathfinder = this.pathfinder.parent;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      this.current.highlight(ctx);
      this.start.highlightStart(ctx);
      this.finish.highlightEnd(ctx);
      if (this.current === this.finish) {
        this.path();
      } else {
        this.algorithm();
      }
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return SolveBFS;
}();

module.exports = SolveBFS;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SolveAStar = function () {
  function SolveAStar(maze) {
    _classCallCheck(this, SolveAStar);

    this.maze = maze;

    this.start = maze.cells[0][0];
    this.start.f = 0;
    this.start.g = 0;
    this.start.h = 0;
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];

    this.open = [this.start];
    this.closed = [];
  }

  _createClass(SolveAStar, [{
    key: "adjacentCells",
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [];

      if (!cell.walls[0]) {
        add.push([0, -maze.len]);
      }
      if (!cell.walls[1]) {
        add.push([maze.len, 0]);
      }
      if (!cell.walls[2]) {
        add.push([0, maze.len]);
      }
      if (!cell.walls[3]) {
        add.push([-maze.len, 0]);
      }

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.explored) {
          neighborCell.parent = cell;
          neighbors.push(neighborCell);
        }
      }
      if (neighbors.length > 0) {
        return neighbors;
      }
    }
  }, {
    key: "findCell",
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        for (var j = 0; j < maze.cells[0].length; j++) {
          var cell = maze.cells[i][j];
          if (cell.x === x && cell.y === y) {
            return cell;
          }
        }
      }
      return null;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      var maze = this.maze;
      if (this.current !== this.finish) {
        if (this.open.length > 0) {
          this.open.sort(function (a, b) {
            return b.f - a.f;
          });
          this.current = this.open.pop();
          this.current.explored = true;
          var neighbors = this.adjacentCells(this.current);
          if (neighbors) {
            for (var i = 0; i < neighbors.length; i++) {
              if (neighbors[i] === this.finish) {
                this.current = neighbors[i];
                return;
              }
              neighbors[i].g = this.current.g + Math.sqrt(Math.pow(neighbors[i].x - this.current.x, 2) + (neighbors[i].y - this.current.y, 2));
              neighbors[i].h = Math.abs(neighbors[i].x - this.finish.x) + Math.abs(neighbors[i].y - this.finish.y);
              neighbors[i].f = neighbors[i].g + neighbors[i].h;
              var openListCell = this.neighborExist(neighbors[i], this.open);
              var closedListCell = this.neighborExist(neighbors[i], this.closed);
              if (openListCell) {
                if (neighbors[i].f > openListCell.f) {}
              } else if (closedListCell) {
                if (neighbors[i].f > openListCell.f) {}
              } else {
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
  }, {
    key: "neighborExist",
    value: function neighborExist(neighbor, list) {
      for (var i = 0; i < list.length; i++) {
        var cell = list[i];
        if (cell.x === neighbor.x && cell.y === neighbor.y) {
          return cell;
        }
      }
      return false;
    }
  }, {
    key: "path",
    value: function path() {
      if (this.pathfinder === this.start) {
        this.maze.solving = false;
        this.maze.solved = true;
      } else if (!this.pathfinder) {
        this.pathfinder = this.finish.parent;
      } else {
        this.pathfinder.path = true;
        this.pathfinder = this.pathfinder.parent;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      if (this.current === this.finish) {
        this.path();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      this.current.highlight(ctx);
      this.start.highlightStart(ctx);
      this.finish.highlightEnd(ctx);
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return SolveAStar;
}();

module.exports = SolveAStar;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SolveDijkstra = function () {
  function SolveDijkstra(maze) {
    var _this = this;

    _classCallCheck(this, SolveDijkstra);

    this.maze = maze;

    this.start = maze.cells[0][0];
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
    this.set = [];
    maze.cells.forEach(function (row) {
      row.forEach(function (cell) {
        cell.distance = 1 / 0;
        cell.parent = null;
        _this.set.push(cell);
      });
    });

    this.start.distance = 0;
  }

  _createClass(SolveDijkstra, [{
    key: "adjacentCells",
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [];
      if (!cell.walls[0]) {
        add.push([0, -maze.len]);
      }
      if (!cell.walls[1]) {
        add.push([maze.len, 0]);
      }
      if (!cell.walls[2]) {
        add.push([0, maze.len]);
      }
      if (!cell.walls[3]) {
        add.push([-maze.len, 0]);
      }

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.explored) {
          neighborCell.parent = cell;
          neighbors.push(neighborCell);
        }
      }
      return neighbors;
    }
  }, {
    key: "findCell",
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        for (var j = 0; j < maze.cells[0].length; j++) {
          var cell = maze.cells[i][j];
          if (cell.x === x && cell.y === y) {
            return cell;
          }
        }
      }
      return null;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      var maze = this.maze;
      if (this.set.length > 0) {
        this.set.sort(function (a, b) {
          return b.distance - a.distance;
        });
        this.current = this.set.pop();
        this.current.explored = true;
        var neighbors = this.adjacentCells(this.current);
        for (var i = 0; i < neighbors.length; i++) {
          var dist = this.current.distance + Math.sqrt(Math.pow(neighbors[i].x - this.current.x, 2) + Math.pow(neighbors[i].y - this.current.y, 2));
          if (dist < neighbors[i].distance) {
            neighbors[i].distance = dist;
          }
        }
      } else {
        this.maze.solving = false;
        this.maze.solved = true;
      }
    }
  }, {
    key: "neighborExist",
    value: function neighborExist(neighbor, list) {
      for (var i = 0; i < list.length; i++) {
        var cell = list[i];
        if (cell.x === neighbor.x && cell.y === neighbor.y) {
          return cell;
        }
      }
      return false;
    }
  }, {
    key: "path",
    value: function path() {
      if (this.pathfinder === this.start) {
        this.maze.solving = false;
        this.maze.solved = true;
      } else if (!this.pathfinder) {
        this.pathfinder = this.finish.parent;
      } else {
        this.pathfinder.path = true;
        this.pathfinder = this.pathfinder.parent;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      if (this.current === this.finish) {
        this.path();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      this.current.highlight(ctx);
      this.start.highlightStart(ctx);
      this.finish.highlightEnd(ctx);
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return SolveDijkstra;
}();

module.exports = SolveDijkstra;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze(canvas) {
    _classCallCheck(this, Maze);

    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');

    this.frameRate = 1000;

    this.generator;
    this.generating;

    this.solver;
    this.solving = false;
    this.solved = false;
  }

  _createClass(Maze, [{
    key: "draw",
    value: function draw() {
      if (this.generator) {
        this.generator.draw(this.ctx);
      }
    }
  }, {
    key: "solve",
    value: function solve() {
      if (this.solver) {
        this.solver.draw(this.ctx);
      }
    }
  }, {
    key: "begin",
    value: function begin() {
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      if (this.generating || this.solving) {
        setTimeout(function () {
          requestAnimationFrame(_this.animate.bind(_this));
          if (_this.generating) {
            _this.draw();
          }
          if (_this.solving) {
            _this.solve();
          } else {
            _this.solver = null;
          }
          if (!_this.generating && !_this.solving) {
            $("button").prop("disabled", false);
            $(".generator-btns button").removeClass("button-on");
          }
        }, 1000 / this.frameRate);
      } else {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }]);

  return Maze;
}();

module.exports = Maze;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map