!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=3)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=n(2),s=function(){function t(e){r(this,t),this.maze=e,e.cells=[],this.createCells(e)}return i(t,[{key:"createCells",value:function(t){for(var e=t.h/t.len,n=t.w/t.len,r=void 0,i=void 0,s=0;s<e;s++){t.cells[s]=[];for(var l=0;l<n;l++)r=l*t.len,i=s*t.len,t.cells[s].push(new o(r,i,t.len)),t.cells[s][l].frontier=!1,t.cells[s][l].visited=!1}}},{key:"draw",value:function(t){var e=this.maze;!0===e.fast?this.fastAlgo():this.slowAlgo(),e.cells.forEach(function(e){e.forEach(function(e){e.draw(t)})}),this.current&&e.generating&&this.current.highlight(t),t.strokeRect(0,0,e.w,e.h)}}]),t}();t.exports=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e){r(this,t),this.maze=e,this.start=e.cells[0][0],this.finish=e.cells[e.cells[0].length-1][e.cells.length-1]}return i(t,[{key:"adjacentCells",value:function(t){var e=this.maze,n=[],r=void 0,i=void 0,o=[];t.walls[0]||o.push([0,-e.len]),t.walls[1]||o.push([e.len,0]),t.walls[2]||o.push([0,e.len]),t.walls[3]||o.push([-e.len,0]);for(var s=0;s<o.length;s++){r=t.x+o[s][0],i=t.y+o[s][1];var l=this.findCell(r,i);(function(){return!(e.x<0||e.x>e.w||e.y<0||e.y>e.h)})()&&l&&!l.explored&&n.push(l)}if(n.length>0)return n}},{key:"findCell",value:function(t,e){for(var n=this.maze,r=0;r<n.cells.length;r++)for(var i=0;i<n.cells[0].length;i++){var o=n.cells[r][i];if(o.x===t&&o.y===e)return o}return null}},{key:"path",value:function(){this.pathfinder===this.start?(this.maze.solving=!1,this.maze.solved=!0):this.pathfinder?(this.pathfinder.path=!0,this.pathfinder=this.pathfinder.parent):this.pathfinder=this.finish.parent}},{key:"draw",value:function(t){var e=this.maze;this.current===this.finish?this.path():this.algorithm(),e.cells.forEach(function(e){e.forEach(function(e){e.draw(t)})}),this.current.highlight(t),this.start.highlightStart(t),this.finish.highlightEnd(t),t.strokeRect(0,0,e.w,e.h)}},{key:"neighborExist",value:function(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(r.x===t.x&&r.y===t.y)return r}return!1}}]),t}();t.exports=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e,n,i){r(this,t),this.x=e,this.y=n,this.len=i,this.walls=[!0,!0,!0,!0],this.visited=!1}return i(t,[{key:"removeWalls",value:function(t){var e=this.x-t.x,n=this.y-t.y;e<0?(this.walls[1]=!1,t.walls[3]=!1):e>0&&(this.walls[3]=!1,t.walls[1]=!1),n<0?(this.walls[2]=!1,t.walls[0]=!1):n>0&&(this.walls[0]=!1,t.walls[2]=!1)}},{key:"draw",value:function(t){var e=this.x,n=this.y;t.strokeStyle="black",t.lineWidth=3,this.walls[0]&&(t.beginPath(),t.moveTo(e,n),t.lineTo(e+this.len,n),t.stroke()),this.walls[1]&&(t.beginPath(),t.moveTo(e+this.len,n),t.lineTo(e+this.len,n+this.len),t.stroke()),this.walls[2]&&(t.beginPath(),t.moveTo(e,n+this.len),t.lineTo(e+this.len,n+this.len),t.stroke()),this.walls[3]&&(t.beginPath(),t.moveTo(e,n+this.len),t.lineTo(e,n),t.stroke()),this.visited?(t.fillStyle="white",t.fillRect(e,n,this.len,this.len)):this.frontier?(t.fillStyle="blue",t.fillRect(e,n,this.len,this.len)):(t.fillStyle="black",t.fillRect(e,n,this.len,this.len)),this.backtrack?(t.fillStyle="rgb(191, 62, 230)",t.fillRect(e,n,this.len,this.len)):this.explored&&(t.fillStyle="pink",t.fillRect(e,n,this.len,this.len)),this.path&&(t.fillStyle="yellow",t.fillRect(e,n,this.len,this.len))}},{key:"highlight",value:function(t){t.fillStyle="black",t.fillRect(this.x,this.y,this.len,this.len)}},{key:"highlightStart",value:function(t){t.fillStyle="green",t.fillRect(this.x,this.y,this.len,this.len)}},{key:"highlightEnd",value:function(t){t.fillStyle="#64fbee",t.fillRect(this.x,this.y,this.len,this.len)}}]),t}();t.exports=o},function(t,e,n){"use strict";var r=n(4);document.addEventListener("DOMContentLoaded",function(){var t=document.getElementById("canvas"),e=t.getContext("2d");t.width=500,t.height=500,e.fillStyle="black",e.fillRect(0,0,t.width,t.height),r(e,t)})},function(t,e,n){"use strict";var r=n(5),i=n(6),o=n(7),s=n(8),l=n(10),a=n(11),c=n(12),u=n(13),h=n(14),f=function(t,e){function n(){t.clearRect(0,0,e.width,e.height),$("button").prop("disabled",!0),g&&(g=new h(e)),g.solver=null,g.solved=!1,g.solving=!1,g.generating=!0}function f(t){"ON"===$("#instant-toggle-text").text()&&(t.fast=!0)}function p(t){t.cells.forEach(function(t){t.forEach(function(t){t.frontier=!1,t.explored=!1,t.path=!1,t.backtrack=!1})})}function v(t,e){$("button").prop("disabled",!0),$(e).addClass("button-on"),t.solver=d,t.solving=!0}var g=new h(e),y=void 0,d=void 0;$("#instant-gen").click(function(){"OFF"===$("#instant-toggle-text").text()?$("#instant-toggle-text").text("ON"):$("#instant-toggle-text").text("OFF")}),$("#dfs-gen").click(function(){n(),y=new r(g),g.generator=y,f(g),$("#dfs-gen").addClass("button-on"),g.begin()}),$("#prim-gen").click(function(){n(),y=new o(g),g.generator=y,f(g),$("#prim-gen").addClass("button-on"),g.begin()}),$("#sidewinder-gen").click(function(){n(),y=new i(g),g.generator=y,f(g),$("#sidewinder-gen").addClass("button-on"),g.begin()}),$("#kruskal-gen").click(function(){n(),y=new s(g),g.generator=y,f(g),$("#kruskal-gen").addClass("button-on"),g.begin()}),$("#dfs-solve").click(function(){g.generator&&(g.solved&&p(g),d=new l(g),v(g,"#dfs-solve"))}),$("#bfs-solve").click(function(){g.generator&&(g.solved&&p(g),d=new a(g),v(g,"#bfs-solve"))}),$("#astar-solve").click(function(){g.generator&&(g.solved&&p(g),d=new c(g),v(g,"#astar-solve"))}),$("#dijkstra-solve").click(function(){g.generator&&(g.solved&&p(g),d=new u(g),v(g,"#dijkstra-solve"))})};t.exports=f},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(0),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t)),o=Math.floor(Math.random()*t.cells.length),s=Math.floor(Math.random()*t.cells[0].length);return n.current=t.cells[o][s],n.current.visited=!0,n.stack=[],n.start=n.current,n}return o(e,t),s(e,[{key:"adjacentCells",value:function(t){for(var e=this.maze,n=[],r=void 0,i=void 0,o=[[-e.len,0],[e.len,0],[0,e.len],[0,-e.len]],s=0;s<o.length;s++){r=t.x+o[s][0],i=t.y+o[s][1];var l=this.findCell(r,i);(function(){return!(e.x<0||e.x>e.w||e.y<0||e.y>e.h)})()&&l&&!l.visited&&n.push(l)}if(n.length>0)return n[Math.floor(Math.random()*n.length)]}},{key:"findCell",value:function(t,e){for(var n=this.maze,r=0;r<n.cells.length;r++)for(var i=0;i<n.cells[0].length;i++){var o=n.cells[r][i];if(o.x===t&&o.y===e)return o}return null}},{key:"slowAlgo",value:function(){var t=this.maze,e=this.adjacentCells(this.current);e?(e.visited=!0,this.stack.push(this.current),this.current.removeWalls(e),this.current=e):this.stack.length>0&&(this.current=this.stack.pop(),this.start===this.current&&(t.generating=!1))}},{key:"fastAlgo",value:function(){for(var t=this.maze;;){var e=this.adjacentCells(this.current);if(e)e.visited=!0,this.stack.push(this.current),this.current.removeWalls(e),this.current=e;else if(this.stack.length>0&&(this.current=this.stack.pop(),this.start===this.current))return void(t.generating=!1)}}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(0),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.currentIdx={x:0,y:0},n.runStart=0,n}return o(e,t),s(e,[{key:"slowAlgo",value:function(){var t=this.maze,e=t.cells.length,n=t.cells[0].length;if(this.currentIdx.y<t.cells.length){if(this.currentIdx.x===n&&(this.currentIdx.x=0,this.currentIdx.y+=1,this.currentIdx.y===e))return this.maze.generating=!1;var r=this.currentIdx.x,i=this.currentIdx.y;if(0===r&&(this.runStart=0),i>0&&(r+1===n||Math.random()<=.5)){var o=this.runStart+Math.floor(Math.random()*(r-this.runStart));t.cells[i][o].removeWalls(t.cells[i-1][o]),this.runStart=r+1}else r+1<n&&t.cells[i][r].removeWalls(t.cells[i][r+1]);t.cells[i][r].visited=!0,this.currentIdx.x+=1}}},{key:"fastAlgo",value:function(){for(var t=this.maze,e=t.cells.length,n=t.cells[0].length,r=void 0,i=void 0,o=0;o<e;o++){r=0;for(var s=0;s<n;s++)o>0&&(s+1===n||Math.random()<=.5)?(i=r+Math.floor(Math.random()*(s-r+1)),t.cells[o][i].removeWalls(t.cells[o-1][i]),r=s+1):s+1<n&&t.cells[o][s].removeWalls(t.cells[o][s+1]),t.cells[o][s].visited=!0}t.generating=!1}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(0),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.frontier=[];var o=t.cells.length,s=t.cells[0].length;return n.mark(Math.floor(Math.random()*s),Math.floor(Math.random()*o)),n}return o(e,t),s(e,[{key:"addFrontier",value:function(t,e){var n=this.maze;t>=0&&e>=0&&t<n.cells[0].length&&e<n.cells.length&&!1===n.cells[e][t].frontier&&!1===n.cells[e][t].visited&&(n.cells[e][t].frontier=!0,this.frontier.push([t,e]))}},{key:"mark",value:function(t,e){this.maze.cells[e][t].visited=!0,this.addFrontier(t+1,e),this.addFrontier(t-1,e),this.addFrontier(t,e+1),this.addFrontier(t,e-1)}},{key:"direction",value:function(t,e,n,r){return t<n?"E":t>n?"W":e<r?"S":e>r?"N":void 0}},{key:"neighbors",value:function(t,e){var n=this.maze,r=[];return t>0&&n.cells[e][t-1].visited&&r.push([t-1,e]),t+1<n.cells[0].length&&n.cells[e][t+1].visited&&r.push([t+1,e]),e>0&&n.cells[e-1][t].visited&&r.push([t,e-1]),e+1<n.cells.length&&n.cells[e+1][t].visited&&r.push([t,e+1]),r}},{key:"algorithm",value:function(){var t=this.maze,e=Math.floor(Math.random()*this.frontier.length),n=this.frontier[e],r=n[0],i=n[1];this.frontier.splice(e,1);var o=this.neighbors(r,i),s=Math.floor(Math.random()*o.length),l=o[s][0],a=o[s][1],c=this.direction(r,i,l,a);"N"===c?(t.cells[i][r].walls[0]=!1,t.cells[a][l].walls[2]=!1):"S"===c?(t.cells[i][r].walls[2]=!1,t.cells[a][l].walls[0]=!1):"E"===c?(t.cells[i][r].walls[1]=!1,t.cells[a][l].walls[3]=!1):(t.cells[i][r].walls[3]=!1,t.cells[a][l].walls[1]=!1),t.cells[i][r].visited=!0,t.cells[a][l].visited=!0,this.mark(r,i)}},{key:"slowAlgo",value:function(){this.maze;this.frontier.length>0?this.algorithm():this.maze.generating=!1}},{key:"fastAlgo",value:function(){for(var t=this.maze;this.frontier.length>0;)this.algorithm();t.generating=!1}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(9),a=n(2),c=n(0),u=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.N="N",n.W="W",n.DX={E:t.len,W:-t.len,N:0,S:0},n.DY={S:t.len,N:-t.len,W:0,E:0},n.maze=t,n.edges=[],n.createGridAndSet(),n.createEdges(),n}return o(e,t),s(e,[{key:"createGridAndSet",value:function(){var t=this.maze;t.cells=[],this.sets=[];for(var e=0;e<t.w/t.len;e++){t.cells[e]=[],this.sets[e]=[];for(var n=0;n<t.h/t.len;n++)t.cells[e].push(new a(n*t.len,e*t.len,t.len)),this.sets[e].push(new l)}}},{key:"createEdges",value:function(){for(var t=this.maze,e=0;e<t.w/t.len;e++)for(var n=0;n<t.h/t.len;n++)e>0&&this.edges.push([n*t.len,e*t.len,this.N]),n>0&&this.edges.push([n*t.len,e*t.len,this.W]);this.edges.sort(function(t,e){return.5-Math.random()})}},{key:"slowAlgo",value:function(){this.edges.length>0?this.algorithm():this.maze.generating=!1}},{key:"fastAlgo",value:function(){for(;this.edges.length>0;)this.algorithm();this.maze.generating=!1}},{key:"algorithm",value:function(){var t=this.maze,e=this.edges.pop(),n=e[0],r=e[1],i=e[2],o=n+this.DX[i],s=r+this.DY[i],l=this.maze.len,a=this.sets[r/l][n/l],c=this.sets[s/l][o/l];a.connected(c)||(a.connect(c),"N"===i?(t.cells[r/l][n/l].walls[0]=!1,t.cells[s/l][o/l].walls[2]=!1):"S"===i?(t.cells[r/l][n/l].walls[2]=!1,t.cells[s/l][o/l].walls[0]=!1):"E"===i?(t.cells[r/l][n/l].walls[1]=!1,t.cells[s/l][o/l].walls[3]=!1):(t.cells[r/l][n/l].walls[3]=!1,t.cells[s/l][o/l].walls[1]=!1)),t.cells[r/l][n/l].visited=!0,t.cells[s/l][o/l].visited=!0}}]),e}(c);t.exports=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(){r(this,t),this.parent=null}return i(t,[{key:"root",value:function(){return this.parent?this.parent.root():this}},{key:"connected",value:function(t){return this.root()===t.root()}},{key:"connect",value:function(t){return t.root().parent=this}}]),t}();t.exports=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.start.parent=null,n.current=n.start,n.stack=[],n}return o(e,t),s(e,[{key:"algorithm",value:function(){this.maze;if(this.current!==this.finish){var t=this.adjacentCells(this.current);if(t){var e=t[Math.floor(Math.random()*t.length)];e.explored=!0,this.stack.push(this.current),this.current=e}else this.stack.length>0&&(this.current.backtrack=!0,this.current=this.stack.pop())}}},{key:"path",value:function(){this.stack.length>0?this.stack.pop().path=!0:(this.maze.solving=!1,this.maze.solved=!0)}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.current=n.start,n.queue=[],n}return o(e,t),s(e,[{key:"algorithm",value:function(){var t=this;this.maze;if(this.current!==this.finish){var e=this.adjacentCells(this.current);e&&e.forEach(function(e){e.parent=t.current,t.queue.push(e)});var n=this.queue.shift();n.explored=!0,this.current=n}}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.start.f=0,n.start.g=0,n.start.h=0,n.open=[n.start],n.closed=[],n}return o(e,t),s(e,[{key:"algorithm",value:function(){var t=this;this.maze;if(this.current!==this.finish){if(this.open.length>0){this.open.sort(function(t,e){return e.f-t.f}),this.current=this.open.pop(),this.current.explored=!0;var e=this.adjacentCells(this.current);if(e){e.forEach(function(e){e.parent=t.current});for(var n=0;n<e.length;n++){if(e[n]===this.finish)return void(this.current=e[n]);e[n].g=this.current.g+Math.sqrt(Math.pow(e[n].x-this.current.x,2)+(e[n].y,this.current.y,2)),e[n].h=Math.abs(e[n].x-this.finish.x)+Math.abs(e[n].y-this.finish.y),e[n].f=e[n].g+e[n].h;var r=this.neighborExist(e[n],this.open),i=this.neighborExist(e[n],this.closed);r?(e[n].f,r.f):i?(e[n].f,r.f):this.open.push(e[n]),this.closed.push(this.current)}}}}else this.maze.solving=!1,this.maze.solved=!0}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),a=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.set=[],t.cells.forEach(function(t){t.forEach(function(t){t.distance=1/0,t.parent=null,n.set.push(t)})}),n.start.distance=0,n}return o(e,t),s(e,[{key:"algorithm",value:function(){var t=this;this.maze;if(this.set.length>0){this.set.sort(function(t,e){return e.distance-t.distance}),this.current=this.set.pop(),this.current.explored=!0;var e=this.adjacentCells(this.current);e&&e.forEach(function(e){e.parent=t.current});for(var n=0;n<e.length;n++){var r=this.current.distance+Math.sqrt(Math.pow(e[n].x-this.current.x,2)+Math.pow(e[n].y-this.current.y,2));r<e[n].distance&&(e[n].distance=r)}}else this.maze.solving=!1,this.maze.solved=!0}}]),e}(l);t.exports=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e){r(this,t),this.w=e.width,this.h=e.height,this.len=20,this.ctx=e.getContext("2d"),this.frameRate=1e3,this.generator,this.generating,this.solver,this.solving=!1,this.solved=!1}return i(t,[{key:"draw",value:function(){this.generator&&this.generator.draw(this.ctx)}},{key:"solve",value:function(){this.solver&&this.solver.draw(this.ctx)}},{key:"begin",value:function(){requestAnimationFrame(this.animate.bind(this))}},{key:"animate",value:function(){var t=this;this.generating||this.solving?setTimeout(function(){requestAnimationFrame(t.animate.bind(t)),t.generating&&t.draw(),t.solving?t.solve():t.solver=null,t.generating||t.solving||($("button").prop("disabled",!1),$(".generator-btns button").removeClass("button-on"))},1e-4):requestAnimationFrame(this.animate.bind(this))}}]),t}();t.exports=o}]);