//The canvas on we will draw
var canvas = new fabric.Canvas('c', {
  width: 800,
  height: 800
});

//The center of the canvas
var center = {
  x: 400,
  y: 400
};

//Which hexagons are we going to draw
var hexagonsCoors = [
  [0, 0, 0],
  [0, 1, -1],
  [0, -1, 1],
  [1, 0, -1],
  [-1, 0, 1],
  [1, -1, 0],
  [-1, 1, 0]
];

//The grid
var g = Grid(hexagonsCoors, {
  canvas: canvas,
  hexagonSize: 50,
  center: center
});

//Draw the grid
g.draw();
