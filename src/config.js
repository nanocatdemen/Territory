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
