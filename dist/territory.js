//TODO: Investigate if extending from fabric.Group is worth it
CubeCoordinateSet = (function($) {

  var CubeCoordinateSet = function() {

    var elements = {};

    var self = {
      elements: elements
    };

    self.get = function(coordinate) {
      if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
      return self.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()]
    }

    self.set = function(coordinate, v) {
      if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
      self.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()] = v;
    }

    var nextIndex = 0;

    return self;
  };

  return CubeCoordinateSet;
})(jQuery);

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
    this.set('center', center);
    this.set('edgeSize', edgeSize);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      center: this.get('center'),
      size: this.get('edgeSize')
    });
  },

  //TODO: Rewrite events to accomodate the hexagon borders (Piggyback?)

});

Grid = (function($) {

  var Grid = function(hexagonsCoors, options) {

    //TODO: Provide default values or exceptions
    var canvas = options.canvas;
    var hexagonSize = options.hexagonSize;
    var center = options.center;

    var hexagons = CubeCoordinateSet();
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
        //TODO: Put this in hexagon constructor
        hexagon.perPixelTargetFind = true;
        hexagons.set({
          x: x,
          y: y,
          z: z
        }, hexagon);
      }
    }

    var self = {
      canvas: canvas,
      hexagons: hexagons
    };

    self.draw = function() {
      for (hexagonKey in self.hexagons.elements) {
        self.canvas.add(self.hexagons.elements[hexagonKey]);
      }
    };

    return self;
  };

  return Grid;
})(jQuery);

//The canvas on we will draw
var canvas = new fabric.Canvas('c', {
  width: 800,
  height: 800
});

canvas.selection = false;

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

/*canvas.on('mouse:over', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (!hexagon.clicked) {
      hexagon.setColor('#7FB7DB');
    }
  }
  this.renderAll();
});

canvas.on('mouse:out', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (!hexagon.clicked) {
      hexagon.setColor('#D3E5F0');
    }
  }
  this.renderAll();
});*/

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
