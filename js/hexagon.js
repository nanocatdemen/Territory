var Hexagon = fabric.util.createClass(fabric.Polygon, {

  type: 'hexagon',

  initialize: function(center, edgeSize, options) {
    options || (options = {});

    var corners = [];
    for (var i = 0; i < 6; i++) {
      var angleDeg = 60 * i;
      var angleRad = Math.PI / 180 * angleDeg;
      var corner = {
        x: center.x + edgeSize * Math.cos(angleRad),
        y: center.y + edgeSize * Math.sin(angleRad)
      };
      corners.push(corner);
    }

    this.callSuper('initialize', corners, options);
    this.set('center', center);
    this.set('edgeSize', edgeSize);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      center: this.get('center'),
      size: this.get('edgeSize')
    });
  },

  //TODO: Rewrite events to accomodate the hexagon borders (Piggyback?)

});
