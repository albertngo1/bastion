const GenerateDFS = require('./algos/dfs.js');
const GenerateSidewinder = require('./algos/sidewinder.js');
const GeneratePrim = require('./algos/prim.js');
const GenerateKruskal = require('./algos//kruskal/kruskal.js');
const SolveDFS = require('./algos/dfs_solve.js');
const SolveBFS = require('./algos/bfs_solve.js');
const SolveAStar = require('./algos/a_star_solve.js');
const Maze = require('./maze.js');


const eventHandle = (ctx, canvas) => {

  let maezr = new Maze(canvas);

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

  $("#instant-gen").click(() => {
    eventHelper();
    let gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    maezr.generator.fast = true;
    maezr.begin();
    });

  $("#dfs-gen").click(() => {
    eventHelper();
    let gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#prim-gen").click(() => {
    eventHelper();
    let gen = new GeneratePrim(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#sidewinder-gen").click(() => {
    eventHelper();
    let gen = new GenerateSidewinder(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#kruskal-gen").click(() => {
    eventHelper();
    let gen = new GenerateKruskal(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#dfs-solve").click(() => {
    if (maezr.generator && !maezr.solved) {
      $("button").prop("disabled", true);
      let solve = new SolveDFS(maezr);
      maezr.solver = solve;
      maezr.solving = true;
    }
  });

  $("#bfs-solve").click(() => {
    if (maezr.generator && !maezr.solved) {
      $("button").prop("disabled", true);
      let solve = new SolveBFS(maezr);
      maezr.solver = solve;
      maezr.solving = true;
    }
  });

  $("#astar-solve").click(() => {
    if (maezr.generator && !maezr.solved) {
      $("button").prop("disabled", true);
      let solve = new SolveAStar(maezr);
      maezr.solver = solve;
      maezr.solving = true;
    }
  });



}


module.exports = eventHandle;
