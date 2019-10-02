var canvas = document.getElementById("lab03");
var ctx = canvas.getContext("2d");
var gridSize = 5;

var waiting = null;
var firstX = 0;
var firstY = 0;

function line(x1, y1, x2, y2) {
  var eps = 0;
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  var dx = deltaX / deltaY;
  var dy = deltaY / deltaX;
  var h = Math.abs(deltaX) >= Math.abs(deltaY);
  var increaseX = (h) ? ((deltaX >= 0) ? 1 : -1) : 0;
  var increaseY = (h) ? 0 : ((deltaY >= 0) ? 1 : -1);
  var decreaseX = (h) ? 0 : ((deltaX >= 0) ? 1 : -1);
  var decreaseY = (h) ? ((deltaY >= 0) ? 1 : -1) : 0;
  for (var copyX = x1, copyY = y1;
       (h) ? ((increaseX > 0) ? copyX <= x2 : copyX >= x2) : ((increaseY > 0) ? copyY <= y2 : copyY >= y2);
       copyX += increaseX, copyY += increaseY) {
    if (Math.abs(eps) >= 0.5) {
      eps -= (eps >= 0) ? 1 : -1;
      copyX += decreaseX;
      copyY += decreaseY;
    }
    ctx.fillRect(copyX * gridSize, copyY * gridSize, gridSize, gridSize);
    eps += (h) ? dy : dx;
  }
}

canvas.addEventListener("click", function (event) {
  event.preventDefault();
  if (waiting === "Line") {
    line(firstX, firstY, Math.floor(event.offsetX / gridSize), Math.floor(event.offsetY / gridSize));
    waiting = null;
  } else {
    waiting = "Line";
    firstX = Math.floor(event.offsetX / gridSize);
    firstY = Math.floor(event.offsetY / gridSize);
    return;
  }

});

