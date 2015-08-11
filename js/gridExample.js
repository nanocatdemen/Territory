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
          var hexagon = Hexagon(canvas, {
            center: hexagonCenter,
            edgeSize: hexagonSize,
            orientation: 0
          }).setFillColor('#F5C9C9');
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

  function cube_round(h) {
    var rx = Math.round(h.x);
    var ry = Math.round(h.y);
    var rz = Math.round(h.z);

    var x_diff = Math.abs(rx - h.x);
    var y_diff = Math.abs(ry - h.y);
    var z_diff = Math.abs(rz - h.z);

    if (x_diff > y_diff & x_diff > z_diff)
      rx = -ry - rz;
    else if (y_diff > z_diff)
      ry = -rx - rz;
    else
      rz = -rx - ry;

    return {
      x: rx,
      y: ry,
      z: rz
    };
  }

  function pixel_to_hex(pixel_x, pixel_y) {
    var q = pixel_x * 2 / 3 / 50;
    var r = (-pixel_x / 3 + Math.sqrt(3) / 3 * pixel_y) / 50;
    var x = q;
    var z = r;
    var y = -x - z;
    return cube_round({
      x: x,
      y: y,
      z: z
    });
  }

  var coors = {
    x: 0,
    y: 0,
    z: 0
  };

  $(document).on("mousemove", function(event) {
    var divPos = $('#myCanvas').position();
    var o = pixel_to_hex(event.pageX - 403 - divPos.left, event.pageY - 403 - divPos.top);
    $("#log").text('x: ' + o.x + ' y: ' + o.y + ' z: ' + o.z);
    if (!(coors.x == o.x & coors.y == o.y & coors.z == o.z)) {
      hexagons.get(coors).setFillColor('#F5C9C9').update();
      var anHexagon = hexagons.get(o)
      if (anHexagon) {
        anHexagon.setFillColor('#C9F5F5').update();
        coors = {
          x: o.x,
          y: o.y,
          z: o.z
        };
      }
    } else {
      hexagons.get(o).setFillColor('#C9F5F5').update();
      coors = {
        x: o.x,
        y: o.y,
        z: o.z
      };
    }
  });


})(jQuery)
