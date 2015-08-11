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

    // This shouldn't work on IE
    self[Symbol.iterator] = function*() {
      var i = 0;
      for (e in elements) {
        yield elements[e];
      }
    }

    return self;
  };

  return CubeCoordinateSet;
})(jQuery);
