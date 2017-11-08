const GenerateDFS = require('./algos/gen/dfs.js');
const GenerateSidewinder = require('./algos/gen/sidewinder.js');
const GeneratePrim = require('./algos/gen/prim.js');
const GenerateKruskal = require('./algos/gen/kruskal/kruskal.js');
const SolveDFS = require('./algos/dfs_solve.js');
const SolveBFS = require('./algos/bfs_solve.js');
const SolveAStar = require('./algos/a_star_solve.js');
const SolveDijkstra = require('./algos/dijkstra_solve.js');
const Maze = require('./maze.js');


const eventHandle = (ctx, canvas) => {

  let maezr = new Maze(canvas);
  let gen;
  let solve;

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
    let txt = $("#instant-toggle-text").text();

    if (txt === "ON") {
      maezr.fast = true;
    }
  }

  function resetMaze(maze) {
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.frontier = false;
        cell.explored = false;
        cell.path = false;
      })
    });
  }

  function solveHelper(maze, id) {
    $("button").prop("disabled", true);
    $(id).addClass("button-on");
    maze.solver = solve;
    maze.solving = true;
  }

  $("#instant-gen").click(() => {
    let txt = $("#instant-toggle-text").text();
    if (txt === "OFF") {
      $("#instant-toggle-text").text("ON");
    } else {
      $("#instant-toggle-text").text("OFF");
    }

  });

  $("#dfs-gen").click(() => {
    eventHelper();
    gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#dfs-gen").addClass("button-on");
    maezr.begin();
  });

  $("#prim-gen").click(() => {
    eventHelper();
    gen = new GeneratePrim(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#prim-gen").addClass("button-on");
    maezr.begin();
  });

  $("#sidewinder-gen").click(() => {
    eventHelper();
    gen = new GenerateSidewinder(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#sidewinder-gen").addClass("button-on");
    maezr.begin();
  });

  $("#kruskal-gen").click(() => {
    eventHelper();
    gen = new GenerateKruskal(maezr);
    maezr.generator = gen;
    fastAlgoHelper(maezr);
    $("#kruskal-gen").addClass("button-on");
    maezr.begin();
  });

  $("#dfs-solve").click(() => {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveDFS(maezr);
      solveHelper(maezr, "#dfs-solve");
    }
  });

  $("#bfs-solve").click(() => {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveBFS(maezr);
      solveHelper(maezr, "#bfs-solve");
    }
  });

  $("#astar-solve").click(() => {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveAStar(maezr);
      solveHelper(maezr, "#astar-solve");
    }
  });

  $("#dijkstra-solve").click(() => {
    if (maezr.generator) {
      if (maezr.solved) {
        resetMaze(maezr);
      }
      solve = new SolveDijkstra(maezr);
      solveHelper(maezr, "#dijkstra-solve");
    }
  });


}


module.exports = eventHandle;
