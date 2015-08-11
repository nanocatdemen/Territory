Hexagon = (function($) {

  var Hexagon = function(canvas, options) {
    var self = {
      center: options.center,
      edgeSize: options.edgeSize,
      orientation: options.orientation,
      canvas: canvas,
      strokeColor: options.strokeColor || '#000000',
      fillColor: options.fillColor || '#FFFFFF'
    };

    self.corner = function(i) {
      var angleDeg = 60 * i;
      var angleRad = Math.PI / 180 * angleDeg;
      return {
        x: self.center.x + self.edgeSize * Math.cos(angleRad),
        y: self.center.y + self.edgeSize * Math.sin(angleRad)
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

    //TODO: Fix this
    self.setStrokeColor = function(color) {
      self.strokeColor = color;
      return self;
    }

    self.setFillColor = function(color) {
      self.fillColor = color;
      self.polygon.setFill(color);
      return self;
    }

    self.update = function() {
      self.draw();
    }

    self.onMouseOver = function(callback) {
    }

    self.onClick = function(callback) {
    }

    //ETC

    return self;
  };

  return Hexagon;
})(jQuery);
