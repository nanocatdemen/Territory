Grid = (function($) {

  var Grid = function(hexagons) {

    var self = {
      hexagons: hexagons,
    };

    self.draw = function() {
      for (hexagon of self.hexagons) {
        hexagon.draw();
      }
    };

    return self;
  };

  return Grid;
})(jQuery);
