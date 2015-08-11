Hexagon = (function($) {

  var Hexagon = function(center, edge, orientation, canvas) {
    var self = {
      center: center,
      edge: edge,
      orientation: orientation,
      canvas: canvas,
      strokeColor: '#000000',
      fillColor: '#FFFFFF',
      width: 2
    };

    self.corner = function(i) {
      var angleDeg = 60 * i;
      var angleRad = Math.PI / 180 * angleDeg;
      return {
        x: self.center.x + self.edge * Math.cos(angleRad),
        y: self.center.y + self.edge * Math.sin(angleRad)
      };
    };

    var corners = [];
    for (var i = 0; i < 6; i++) {
      corners.push(self.corner(i));
    }

    self.polygon = new fabric.Polygon(
      corners, {
        fill: self.fillColor,
        stroke : self.strokeColor,
        selectable : false
      }
    );

    self.draw = function() {
      self.canvas.add(self.polygon);
    };

    self.setStrokeColor = function(color) {
      self.strokeColor = color;
      return self;
    }

    self.setFillColor = function(color) {
      self.fillColor = color;
      self.polygon.setFill(color);
      return self;
    }

    self.setWidth = function(width) {
      self.width = width;
      return self;
    }

    self.update = function() {
      self.draw();
    }

    self.on = function(event, callback) {
      console.log(callback);
      $(self).on(event, callback);
    }

    return self;
  };

  return Hexagon;
})(jQuery);
