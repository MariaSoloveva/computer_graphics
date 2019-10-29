var canvas = document.getElementById('lab06');
var ctx = canvas.getContext('2d');
var buffer = [];
var rect = canvas.getBoundingClientRect();
var offsetX = rect.left;
var offsetY = rect.top

function getMousePos(event) {
  var vvx = event.clientX - offsetX
  var vvy = event.clientY - offsetY
  ctx.fillRect(vvx, vvy, 3, 3);
  return {
    x: vvx,
    y: vvy
  };
}
function drawLine(pt1, pt2) {
  ctx.beginPath()
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  ctx.moveTo(pt1[0], pt1[1]);
  ctx.lineTo(pt2[0], pt2[1]);
  ctx.stroke();
}
function fillFigure() {
  console.log(buffer);
  buffer = rastFigure();
  console.log(buffer);
  for (var i = 0; i < buffer.length - 2; i++) {
    if (buffer[i][1] == buffer[i + 2][1] && buffer[i][1] != buffer[i + 3][1]) {
      drawLine(buffer[i], buffer[i + 2]);
      i += 2;
    }
    else if (buffer[i][1] == buffer[i + 1][1]) {
      drawLine(buffer[i], buffer[i + 1]);
      i++;
    }
  }
}
function oneLine(pt1, pt2) {
  if (pt1[1] == pt2[1]) { return true; }
  return false;
}
function rastFigure() {
  var poly = [];
  for (var i = 0; i < buffer.length - 1; i++) {
    if (!oneLine(buffer[i], buffer[i + 1])) {
      poly = poly.concat(restLine(buffer[i], buffer[i + 1]));
    }
    else { poly.push(buffer[i]); }
  }
  if (!oneLine(buffer[buffer.length - 1], buffer[0])) {
    poly = poly.concat(restLine(buffer[buffer.length - 1], buffer[0]));
  }
  return poly.sort(sortFunc);
}
function restLine(pt1, pt2) {
  var y = pt1[1],
    dx = (pt2[0] - pt1[0]) / (pt2[1] - pt1[1]),
    x = pt1[0],
    poly = [];
  if (pt1[1] < pt2[1]) {
    while (y <= pt2[1]) {
      poly.push([x, y]);
      y++;
      x += dx;
    }
  }
  else {
    while (y >= pt2[1]) {
      poly.push([x, y]);
      y--;
      x -= dx;
    }
  }
  return poly;
}
function sortFunc(pt1, pt2) {
  if (pt1[1] > pt2[1]) return 1;
  if (pt1[1] < pt2[1]) return -1;
  if (pt1[1] == pt2[1]) {
    if (pt1[0] > pt2[0]) return 1;
    if (pt1[0] < pt2[0]) return -1;
    if (pt1[0] == pt2[0]) return 0;
  }
}
var rectListener = function (event) {
  var mousePos = getMousePos(event);
  buffer.push([mousePos.x, mousePos.y]);
}
var drawListener = function (event) {
  event.preventDefault();
  var tmpBuffer = [];
  tmpBuffer = buffer;
  for (var j = 0; j < tmpBuffer.length; j++) {
    if (j == tmpBuffer.length - 1) {
      tmpBuffer = buffer;
      drawLine(tmpBuffer[j], tmpBuffer[0]);
    }
    else { tmpBuffer = buffer; drawLine(tmpBuffer[j], tmpBuffer[j + 1]); }
  }
  fillFigure();
  buffer = [];
}

canvas.addEventListener('click', rectListener, false);
canvas.addEventListener('contextmenu', drawListener, false);
