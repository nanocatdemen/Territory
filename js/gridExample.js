var canvas = new fabric.Canvas('c', {
  width: 800,
  height: 800
});

var center = {
  x: 400,
  y: 400
};

var hexagonsCoors = [
  [0, 0, 0],
  [0, 1, -1],
  [0, -1, 1],
  [1, 0, -1],
  [-1, 0, 1],
  [1, -1, 0],
  [-1, 1, 0]
];

var g = Grid(hexagonsCoors, {
  canvas: canvas,
  hexagonSize: 50,
  center: center
});
g.draw();
