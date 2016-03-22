var CubeCoordinateSet = function() {

  this.elements = {};

}

CubeCoordinateSet.prototype.get = function(coordinate) {

  if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
  return this.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()]

}

CubeCoordinateSet.prototype.set = function(coordinate, v) {

  if (coordinate.x + coordinate.y + coordinate.z != 0) throw 'Error: invalid cube coordinate'
  this.elements[coordinate.x.toString() + ',' + coordinate.y.toString() + ',' + coordinate.z.toString()] = v;

}
