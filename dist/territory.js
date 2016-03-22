var CubeCoordinateSet = function() {

  this.elements = {};

}

CubeCoordinateSet.prototype.get = function(coordinate) {

  if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
  return this.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()]

}

CubeCoordinateSet.prototype.set = function(coordinate, v) {

  if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
  this.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()] = v;

}

var Hexagon = fabric.util.createClass(fabric.Polygon, {

  type: 'hexagon',

  initialize: function(center, edgeSize, options) {
    options || (options = {});

    var corners = [];
    for (var i = 0; i < 6; i++) {
      var angleDeg = 60 * i;
      var angleRad = Math.PI / 180 * angleDeg;
      var corner = {
        x: center.x + edgeSize * Math.cos(angleRad),
        y: center.y + edgeSize * Math.sin(angleRad)
      };
      corners.push(corner);
    }

    this.callSuper('initialize', corners, options);
    // This is to don't overlap hexagon borders
    this.set('perPixelTargetFind', true);
    this.set('center', center);
    this.set('edgeSize', edgeSize);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      center: this.get('center'),
      size: this.get('edgeSize')
    });
  }

});

var Grid = function(hexagonsCoors, options) {

  //TODO: Provide default values or exceptions
  this.canvas = options.canvas;
  var hexagonSize = options.hexagonSize;
  var center = options.center;

  this.hexagons = new CubeCoordinateSet();
  for (hexagonCoorKey in hexagonsCoors) {
    var x = hexagonsCoors[hexagonCoorKey][0];
    var y = hexagonsCoors[hexagonCoorKey][1];
    var z = hexagonsCoors[hexagonCoorKey][2];
    if (x + y + z == 0) {
      var hexagonCenter = {
        x: center.x + 3 / 2 * hexagonSize * x,
        y: center.y + (Math.sqrt(3) / 2) * hexagonSize * z - Math.sqrt(3) / 2 * hexagonSize * y
      };
      var hexagon = new Hexagon(hexagonCenter, 50, {
        fill: '#D3E5F0',
        stroke: '#1F8ACF',
        selectable: false
      });
      this.hexagons.set({
        x: x,
        y: y,
        z: z
      }, hexagon);
    }
  }

}

Grid.prototype.draw = function() {
  for (hexagonKey in this.hexagons.elements) {
    this.canvas.add(this.hexagons.elements[hexagonKey]);
  }
};

var config = {};

(function() {

  var size = {
    width: 800,
    height: 800
  };

  //The center of the canvas
  var center = {
    x: size.width / 2,
    y: size.height / 2
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

  var hexagonSize = 50;

  $.extend(config, {size: size}, {center: center}, {hexagonsCoors: hexagonsCoors}, {hexagonSize: hexagonSize});

})();

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
