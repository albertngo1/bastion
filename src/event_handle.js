const GenerateDFS = require('./generate/dfs.js');
const GenerateSidewinder = require('./generate/sidewinder.js');
const GeneratePrim = require('./generate/prim.js');
const GenerateKruskal = require('./generate//kruskal/kruskal.js');
const Maze = require('./maze.js');

const eventHandle = (ctx, canvas) => {
  
  let maezr;

  function eventHelper() {
    $("button").prop("disabled", true);
    maezr = new Maze(canvas);
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
    maezr.generator.fast = false;
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
}


module.exports = eventHandle;
