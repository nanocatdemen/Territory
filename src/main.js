//The canvas on we will draw
var canvas = new fabric.Canvas('c', config.size);

canvas.selection = false;

//The grid
var g = new Grid(config.hexagonsCoors, {
  canvas: canvas,
  hexagonSize: config.hexagonSize,
  center: config.center
});

//Draw the grid
g.draw();

canvas.on('mouse:up', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (hexagon.clicked) {
      hexagon.clicked = false;
      hexagon.setColor('#D3E5F0');
    } else {
      hexagon.clicked = true;
      hexagon.setColor('#FF968E');
    }
  }
  this.renderAll();
});
