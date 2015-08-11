(function($) {
  var canvas = new fabric.Canvas('c', {
    width: 800,
    height: 800
  });

  var center = {
    x: 400,
    y: 400
  };

  var size = 7;
  var hexagonSize = 50;

  var hexagons = CubeCoordinateSet();
  for (var x = -Math.floor(size / 2); x < Math.ceil(size / 2); x++) {
    for (var y = -Math.floor(size / 2); y < Math.ceil(size / 2); y++) {
      for (var z = -Math.floor(size / 2); z < Math.ceil(size / 2); z++) {
        if (x + y + z == 0) {
          var hexagonCenter = {
            x: center.x + 3 / 2 * hexagonSize * x,
            y: center.y + (Math.sqrt(3) / 2) * hexagonSize * z - Math.sqrt(3) / 2 * hexagonSize * y
          };
          var hexagon = Hexagon(hexagonCenter, hexagonSize, 0, canvas).setFillColor('#F5C9C9');
          hexagons.set({
            x: x,
            y: y,
            z: z
          }, hexagon);
        }
      }
    }
  }

  var g = Grid(hexagons);
  g.draw();

})(jQuery)
