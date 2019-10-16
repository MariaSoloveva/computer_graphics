var doc_before = document.getElementById("before");
var doc_after = document.getElementById("after");

var before_Ctx = doc_before.getContext("2d");
var after_Ctx = doc_after.getContext("2d");

var imageElement = new Image();
imageElement.src = "./image2.jpg";
imageElement.onload = filterImage;

function filterImage() {
  var width = imageElement.naturalWidth;
  var height = imageElement.naturalHeight;

  doc_before.width = width;
  doc_before.height = height;
  doc_after.width = width;
  doc_after.height = height;

  before_Ctx.drawImage(imageElement, 0, 0);

  var beforeImData = before_Ctx.getImageData(0, 0, width, height);
  var afterImData = after_Ctx.createImageData(width, height);

  function find(x, y, c) {
    return (y * width + x) * 4 + c;
  }
  function filter(x, y, oldData, newData) {
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
      for (var ch = 0; ch < 4; ++ch) {
        var c = find(x, y, ch);
        newData[c] = 0;
      }
      return;
    }
    var matrix = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    var sumX = [0, 0, 0];
    var sumY = [0, 0, 0];
    for (var ch = 0; ch < 3; ++ch) {
      for (var dy = -1; dy <= 1; ++dy) {
        for (var dx = -1; dx <= 1; ++dx) {
          var c = find(x + dx, y + dy, ch);
          sumX[ch] += oldData[c] * matrix[dx + 1][dy + 1];
          sumY[ch] += oldData[c] * matrix[dy + 1][dx + 1];
        }
      }
    }

    var sum = Math.sqrt(sumX[0] * sumX[0] + sumY[0] * sumY[0]) +
      Math.sqrt(sumX[1] * sumX[1] + sumY[1] * sumY[1]) +
      Math.sqrt(sumX[2] * sumX[2] + sumY[2] * sumY[2]);
    sum /= 10; // brightness

    var c2 = find(x, y, 0);
    newData[c2] = sum;
    newData[c2 + 1] = sum;
    newData[c2 + 2] = sum;
    newData[c2 + 3] = 255;
  }
  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      filter(x, y, beforeImData.data, afterImData.data);
    }
  }
  after_Ctx.putImageData(afterImData, 0, 0);
}
