const GenerateDFS = require('./algos/gen/dfs.js');
const GenerateSidewinder = require('./algos/gen/sidewinder.js');
const GeneratePrim = require('./algos/gen/prim.js');
const GenerateKruskal = require('./algos/gen/kruskal/kruskal.js');
const SolveDFS = require('./algos/sol/dfs_solve.js');
const SolveBFS = require('./algos/sol/bfs_solve.js');
const SolveAStar = require('./algos/sol/a_star_solve.js');
const SolveDijkstra = require('./algos/sol/dijkstra_solve.js');
const Maze = require('./maze.js');


const eventHandle = (ctx, canvas) => {

  let bastion = new Maze(canvas);
  let gen;
  let solve;

  function eventHelper() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("button").prop("disabled", true);
    if (bastion) {
      bastion = new Maze(canvas);
    }
    bastion.solver = null;
    bastion.solved = false;
    bastion.solving = false;
    bastion.generating = true;
  }

  function fastAlgoHelper(bastion) {
    let txt = $("#instant-toggle-text").text();

    if (txt === "ON") {
      bastion.fast = true;
    }
  }

  function resetMaze(maze) {
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.frontier = false;
        cell.explored = false;
        cell.path = false;
        cell.backtrack = false;
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
    gen = new GenerateDFS(bastion);
    bastion.generator = gen;
    fastAlgoHelper(bastion);
    $("#dfs-gen").addClass("button-on");
    bastion.begin();
  });

  $("#prim-gen").click(() => {
    eventHelper();
    gen = new GeneratePrim(bastion);
    bastion.generator = gen;
    fastAlgoHelper(bastion);
    $("#prim-gen").addClass("button-on");
    bastion.begin();
  });

  $("#sidewinder-gen").click(() => {
    eventHelper();
    gen = new GenerateSidewinder(bastion);
    bastion.generator = gen;
    fastAlgoHelper(bastion);
    $("#sidewinder-gen").addClass("button-on");
    bastion.begin();
  });

  $("#kruskal-gen").click(() => {
    eventHelper();
    gen = new GenerateKruskal(bastion);
    bastion.generator = gen;
    fastAlgoHelper(bastion);
    $("#kruskal-gen").addClass("button-on");
    bastion.begin();
  });

  $("#dfs-solve").click(() => {
    if (bastion.generator) {
      if (bastion.solved) {
        resetMaze(bastion);
      }
      solve = new SolveDFS(bastion);
      solveHelper(bastion, "#dfs-solve");
    }
  });

  $("#bfs-solve").click(() => {
    if (bastion.generator) {
      if (bastion.solved) {
        resetMaze(bastion);
      }
      solve = new SolveBFS(bastion);
      solveHelper(bastion, "#bfs-solve");
    }
  });

  $("#astar-solve").click(() => {
    if (bastion.generator) {
      if (bastion.solved) {
        resetMaze(bastion);
      }
      solve = new SolveAStar(bastion);
      solveHelper(bastion, "#astar-solve");
    }
  });

  $("#dijkstra-solve").click(() => {
    if (bastion.generator) {
      if (bastion.solved) {
        resetMaze(bastion);
      }
      solve = new SolveDijkstra(bastion);
      solveHelper(bastion, "#dijkstra-solve");
    }
  });


}


module.exports = eventHandle;
