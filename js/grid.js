Grid = (function($) {

  var Grid = function(hexagonsCoors, options) {

    //TODO: Provide default values or exceptions
    var canvas = options.canvas;
    var hexagonSize = options.hexagonSize;
    var center = options.center;

    var hexagons = CubeCoordinateSet();
    for (hexagonCoor of hexagonsCoors) {
      var x = hexagonCoor[0];
      var y = hexagonCoor[1];
      var z = hexagonCoor[2];
      if (x + y + z == 0) {
        var hexagonCenter = {
          x: center.x + 3 / 2 * hexagonSize * x,
          y: center.y + (Math.sqrt(3) / 2) * hexagonSize * z - Math.sqrt(3) / 2 * hexagonSize * y
        };
        var hexagon = new Hexagon(hexagonCenter, 50, {
            fill: '#F5C9C9',
            stroke: '#000000',
            selectable: false
          });
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
      for (hexagon of self.hexagons) {
        self.canvas.add(hexagon);
      }
    };

    return self;
  };

  return Grid;
})(jQuery);
