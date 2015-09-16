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
