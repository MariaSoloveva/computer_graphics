var canvas = document.getElementById('lab04');
var ctx = canvas.getContext('2d');
var buffer = [];
var bufferRect = [];
var state  = 0;
var rect = canvas.getBoundingClientRect();
var offsetX = rect.left;
var offsetY = rect.top;

function getMousePos(event) {
  var vvx = event.clientX - offsetX;
  var vvy = event.clientY - offsetY;
  ctx.fillRect(vvx, vvy, 3, 3);
  return {
    x: vvx,
    y: vvy
  };
}
function drawLine(pt1, pt2) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  ctx.moveTo(pt1[0], pt1[1]);
  ctx.lineTo(pt2[0], pt2[1]);
  ctx.stroke();
}
function vector__product(pt1, pt2) {
  return pt1[0] * pt2[1] - pt2[0] * pt1[1];
}
function scalar(pt1, pt2) {
  return pt1[0] * pt2[0] + pt1[1] * pt2[1];
}
function delta(pt1, pt2) {
  return [pt2[0] - pt1[0], pt2[1] - pt1[1]];
}
function normal(pt1, pt2) {
  return [pt2[1] - pt1[1], pt1[0] - pt2[0]];
}
function p_s(pt1, pt2, t) {
  return [pt1[0] + t * (pt2[0] - pt1[0]), pt1[1] + t * (pt2[1] - pt1[1])];
}

function cyrus_beck() {
  ctx.clearRect(0, 0, 1000, 500);
  var orient = orientation();
  var tmpBuffer = [];
  var tmpCount = 0;
  console.log("orientation :" + orient);
  for (var i = 0; i < buffer.length; i += 2) {
    var t0 = 0, t1 = 1;
    var flag = true;
    for (var j = 0; j < bufferRect.length; j++) {
      var n;
      if (orient === 'anticlockwise') {
        if (j === bufferRect.length - 1) n = normal(bufferRect[0], bufferRect[j]);
        else n = normal(bufferRect[j + 1], bufferRect[j]);
      }
      else if (orient === 'clockwise') {
        if (j === bufferRect.length - 1) n = normal(bufferRect[j], bufferRect[0]);
        else n = normal(bufferRect[j], bufferRect[j + 1]);
      }
      else {
        alert('ERROR');
        return;
      }
      var pn = scalar(delta(buffer[i], buffer[i + 1]), n);
      var qn = scalar(delta(bufferRect[j], buffer[i]), n);
      if (pn !== 0) {
        var t = -qn / pn;
        if (pn < 0) {
          if (t < t1) t1 = t;
        }
        else {
          if (t > t0) t0 = t;
        }
      }
      else if (qn < 0) flag = false;
    }
    if (t0 > t1) flag = false;
    if (flag) {
      var tmpBuffer1, tmpBuffer2;
      tmpBuffer1 = p_s(buffer[i], buffer[i + 1], t0);
      tmpBuffer2 = p_s(buffer[i], buffer[i + 1], t1);
      tmpBuffer.push([parseInt(tmpBuffer1[0]), parseInt(tmpBuffer1[1])]);
      tmpBuffer.push([parseInt(tmpBuffer2[0]), parseInt(tmpBuffer2[1])]);
      drawLine(parseInt(tmpBuffer1[0]), parseInt(tmpBuffer1[1]), parseInt(tmpBuffer2[0]), parseInt(tmpBuffer2[1]));
    }
  }

  for (var j = 0; j < bufferRect.length - 1; j++) {
    drawLine(bufferRect[j][0], bufferRect[j][1], bufferRect[j + 1][0], bufferRect[j + 1][1]);
  }
  drawLine(bufferRect[0][0], bufferRect[0][1], bufferRect[bufferRect.length - 1][0], bufferRect[bufferRect.length - 1][1]);
  buffer = [];
  buffer = tmpBuffer;
  console.log(buffer);
  tmpBuffer = [];
  bufferRect = [];
}
function orientation() {
  var product = [],
    count = 0;
  for (let i = 0; i < bufferRect.length - 2; i++) {
    console.log("bufferRect[i] : "+ bufferRect[i] + " bufferRect[i + 1] : " + bufferRect[i + 1] + "bufferRect[i + 2]" + bufferRect[i + 2]);
    console.log("delta(bufferRect[i], bufferRect[i + 1]) : " + delta(bufferRect[i], bufferRect[i + 1]));
    console.log("delta(bufferRect[i], bufferRect[i + 2]) : " + delta(bufferRect[i], bufferRect[i + 2]));
    product.push(vector__product(delta(bufferRect[i], bufferRect[i + 1]), delta(bufferRect[i], bufferRect[i + 2])));
  }
  console.log("bufferRect[bufferRect.length - 2] : "+ bufferRect[bufferRect.length - 2] + " bufferRect[bufferRect.length - 1] : " + bufferRect[bufferRect.length - 1] + "bufferRect[0])" + bufferRect[0]);
  console.log("delta(bufferRect[bufferRect.length - 2], bufferRect[bufferRect.length - 1]) : " + delta(bufferRect[bufferRect.length - 2], bufferRect[bufferRect.length - 1]));
  console.log("delta(bufferRect[bufferRect.length - 2], bufferRect[0]) : " + delta(bufferRect[bufferRect.length - 2], bufferRect[0]));

  product.push(vector__product(delta(bufferRect[bufferRect.length - 2], bufferRect[bufferRect.length - 1]), delta(bufferRect[bufferRect.length - 2], bufferRect[0])));

  console.log("bufferRect[bufferRect.length - 1] : " + bufferRect[bufferRect.length - 1] + ", bufferRect[0]: " + bufferRect[0]);
  console.log("delta(bufferRect[bufferRect.length - 1], bufferRect[1]) : " + delta(bufferRect[bufferRect.length - 1], bufferRect[1]));
  product.push(vector__product(delta(bufferRect[bufferRect.length - 1], bufferRect[0]), delta(bufferRect[bufferRect.length - 1], bufferRect[1])));
  for (let j = 0; j < product.length; j++) {
    if (product[j] < 0) count--;
    else if (product[j] > 0) count++;
    console.log(" j " + j + " pr: " + product);
    console.log("count :" + count);
  }
  console.log("product.length:" + product.length);
  if (count === product.length) return 'anticlockwise';
  else if (count === -product.length) return 'clockwise';
  else return 'error';
}

var rectListener = function (event) {
  var mousePos = getMousePos(event);
  buffer.push([mousePos.x, mousePos.y]);
  if (state === 1) {
    console.log("state = 1");
    var mousePos = getMousePos(event);
    bufferRect.push([mousePos.x, mousePos.y]);
    state = 2;
  } else if (state === 2) {
    console.log("state = 2");
    var mousePos = getMousePos(event);
    bufferRect.push([mousePos.x, mousePos.y]);
    console.log("Go to Cyrus beck");
    cyrus_beck();
    state = 0;
    bufferRect = [];
  }
};

var drawListener = function (event) {
  if (state === 0) {
      event.preventDefault();
      var tmpBuffer = [];
      tmpBuffer = buffer;
      for (var j = 0; j < tmpBuffer.length; j++) {
        if (j === tmpBuffer.length - 1) {
          tmpBuffer = buffer;
          drawLine(tmpBuffer[j], tmpBuffer[0]);
        } else {
          tmpBuffer = buffer;
          drawLine(tmpBuffer[j], tmpBuffer[j + 1]);
        }
      }
      state = 1;
    }
    buffer = [];
};

canvas.addEventListener('click', rectListener, false);
canvas.addEventListener('contextmenu', drawListener, false);
