var canvas = document.getElementById("lab05");
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
var xbeg, ybeg, rbeg, rRect = 2;
var x1R = -1, y1R, x2R, y2R;
var context = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();

function setInputLine() {
  rRect = -2;
}

function setInputRect() {
  rRect = 1;
}

function max(arr, n) {
  var m = arr[0];
  var i;
  for (i = 1; i < n; ++i) {
    if (m < arr[i]) m = arr[i];
  }
  return m;
}

function min(arr, n) {
  var m = arr[0];
  var i;
  for (i = 1; i < n; ++i) {
    if (m > arr[i]) m = arr[i];
  }
  return m;
}


function Clip(xmin, ymin, xmax, ymax, x1, y1, x2, y2) {
  var p1, p2, p3, p4, q1, q2, q3, q4;
  var posarr = [];
  var negarr = [];
  var posind = 1, negind = 1;
  var xn1, yn1, xn2, yn2;
  var rn1, rn2;
  p1 = -(x2 - x1);
  p2 = -p1;
  p3 = -(y2 - y1);
  p4 = -p3;
  q1 = x1 - xmin;
  q2 = xmax - x1;
  q3 = y1 - ymin;
  q4 = ymax - y1;
  posarr[0] = 1;
  negarr[0] = 0;
  if ((p1 == 0 && q1 < 0) || (p3 == 0 && q3 < 0)) {
    alert("Your line don't cross over reectangle, try again");
    return;
  }
  if (p1 != 0) {
    var r1 = q1 / p1;
    var r2 = q2 / p2;
    if (p1 < 0) {
      negarr[negind++] = r1;
      posarr[posind++] = r2;
    }
    else {
      negarr[negind++] = r2;
      posarr[posind++] = r1;
    }
  }
  if (p3 != 0) {
    var r3 = q3 / p3;
    var r4 = q4 / p4;
    if (p3 < 0) {
      negarr[negind++] = r3;
      posarr[posind++] = r4;
    }
    else {
      negarr[negind++] = r4;
      posarr[posind++] = r3;
    }
  }
  rn1 = max(negarr, negind);
  rn2 = min(posarr, posind);
  if (rn1 > rn2) {
    alert("Линия не пересекает прямоугольник");
    return;
  }
  xn1 = x1 + p2 * rn1;
  yn1 = y1 + p4 * rn1;
  xn2 = x1 + p2 * rn2;
  yn2 = y1 + p4 * rn2;

  context.strokeStyle = '#000';
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
  context.strokeStyle = '#cfc';
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(xn1, yn1);
  context.moveTo(x2, y2);
  context.lineTo(xn2, yn2);
  context.closePath();
  context.stroke();
}


canvas.addEventListener('mousedown', function (event) {
  var x = event.pageX - offsetX,
    y = event.pageY - offsetY;
  context.strokeRect(x, y, 1, 1);
  if (rbeg == 0) {
    rbeg = 1;
    xbeg = x;
    ybeg = y;
  }
  else {
    rbeg = 0;

    context.strokeStyle = '#000000';
    if (rRect > 0) {
      var tx1, tx2, ty3, ty4;
      if (xbeg < x) {
        tx1 = xbeg;
        tx2 = x;
      } else
        if (xbeg > x) {
          tx1 = x;
          tx2 = xbeg;

        }
        else {
          alert("Not correct coordinate");
          x1R = -1;
          return;
        }
      if (ybeg < y) {
        ty1 = ybeg;
        ty2 = y;
      } else
        if (ybeg > y) {
          ty1 = y;
          ty2 = ybeg;

        }
        else {
          alert("Not  correct coordinate");
          x1R = -1;
          return;
        }


      context.strokeRect(x, y, xbeg - x, ybeg - y);
      x1R = tx1;
      y1R = ty1;
      x2R = tx2;
      y2R = ty2;
    }
    else {
      if (x1R > 0) {
        Clip(x1R, y1R, x2R, y2R, x, y, xbeg, ybeg);
      }
      else {
        context.beginPath();
        context.moveTo(xbeg, ybeg);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
      }
    }
  }
});
function setInput() {
  alert("setInput!!");
}

canvas.height = 480;
canvas.width = 640;
context.strokeStyle = "black";
context.strokeRect(1, 1, 638, 478);

rbeg = 0;
context.fillStyle = "gray";
context.strokeStyle = "gray";
context.moveTo(0, 0);
context.lineTo(639, 479);

canvas.addEventListener("click", function (ev) {
  ev.preventDefault();
  setInputLine();
});

canvas.addEventListener("contextmenu", function (ev) {
  console.log(ev);
  ev.preventDefault();
  setInputRect();
});
