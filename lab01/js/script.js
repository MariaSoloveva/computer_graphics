var doc_before = document.getElementById("before");
var doc_after = document.getElementById("after");

var before_Ctx = doc_before.getContext("2d");
var after_Ctx = doc_after.getContext("2d");

var imageElement = new Image();
imageElement.src = "source/image.png";
imageElement.onload = filterImage;

function filterImage() {
  var width = imageElement.naturalWidth;
  var height = imageElement.naturalHeight;

  function count(x, y, c) {
    return (y * width + x) * 4 + c;
  }

  doc_before.width = width;
  doc_before.height = height;
  doc_after.width = width;
  doc_after.height = height;

  before_Ctx.drawImage(imageElement, 0, 0);
  var image_before = before_Ctx.getImageData(0, 0, width, height);
  var image_after = after_Ctx.createImageData(width, height);

  function filter(x, y, oldData, newData) {
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
      for (var inner = 0; inner < 4; ++inner) {
        var c = count(x, y, inner);
        newData[c] = oldData[c];
      }
      return;
    }
    for (var i = 0; i < 4; ++i) {
      var summ = 0;
      for (var dy = -1; dy <= 1; ++dy) {
        for (var dx = -1; dx <= 1; ++dx) {
          summ += oldData[count(x + dx, y + dy, i)];
        }
      }
      newData[count(x, y, inner)] = summ / 9;
    }
  }

  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      filter(x, y, image_before.data, image_after.data);
    }
  }

  after_Ctx.putImageData(image_after, 0, 0);
}
