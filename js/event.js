/*canvas.on('mouse:over', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (!hexagon.clicked) {
      hexagon.setColor('#7FB7DB');
    }
  }
  this.renderAll();
});

canvas.on('mouse:out', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (!hexagon.clicked) {
      hexagon.setColor('#D3E5F0');
    }
  }
  this.renderAll();
});*/

canvas.on('mouse:up', function(e) {
  if (e.target) {
    var hexagon = e.target;
    if (hexagon.clicked) {
      hexagon.clicked = false;
      hexagon.setColor('#D3E5F0');
    } else {
      hexagon.clicked = true;
      hexagon.setColor('#FF968E');
    }
  }
  this.renderAll();
});
