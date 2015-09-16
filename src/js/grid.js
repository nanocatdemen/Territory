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
