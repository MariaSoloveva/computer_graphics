var canvas = document.getElementById("lab02");
var ctx = canvas.getContext("2d");
var img = new Image;
img.setAttribute( 'crossOrigin', 'Anonymous');
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(idata);
  var canvas1 = document.getElementById("lab02_1");
  var ctx1 = canvas1.getContext("2d");
  var h = canvas.height;
  var w = canvas.width;
  var idata1 = ctx1.createImageData(w, h);
  for (var i=1; i<h-1; i++) {
    for (var j=1; j<w-1; j++) {
      if (idata.data[(i*w+j)*4+3] != 0) {
        idata1.data[(i*w+j)*4] = (idata.data[((i-1)*w+(j-1))*4] + idata.data[((i-1)*w+j)*4] + idata.data[((i-1)*w+(j+1))*4] +
          idata.data[(i*w+(j-1))*4] + idata.data[(i*w+j)*4] + idata.data[(i*w+(j+1))*4] +
          idata.data[((i+1)*w+(j-1))*4] + idata.data[((i+1)*w+j)*4] + idata.data[((i+1)*w+(j+1))*4]) / 9;
        idata1.data[(i*w+j)*4+1] = (idata.data[((i-1)*w+(j-1))*4+1] + idata.data[((i-1)*w+j)*4+1] + idata.data[((i-1)*w+(j+1))*4+1] +
          idata.data[(i*w+(j-1))*4+1] + idata.data[(i*w+j)*4+1] + idata.data[(i*w+(j+1))*4+1] +
          idata.data[((i+1)*w+(j-1))*4+1] + idata.data[((i+1)*w+j)*4+1] + idata.data[((i+1)*w+(j+1))*4+1]) / 9;
        idata1.data[(i*w+j)*4+2] = (idata.data[((i-1)*w+(j-1))*4+2] + idata.data[((i-1)*w+j)*4+2] + idata.data[((i-1)*w+(j+1))*4+2] +
          idata.data[(i*w+(j-1))*4+2] + idata.data[(i*w+j)*4+2] + idata.data[(i*w+(j+1))*4+2] +
          idata.data[((i+1)*w+(j-1))*4+2] + idata.data[((i+1)*w+j)*4+2] + idata.data[((i+1)*w+(j+1))*4+2]) / 9;
        idata1.data[(i*w+j)*4+3] = (idata.data[((i-1)*w+(j-1))*4+3] + idata.data[((i-1)*w+j)*4+3] + idata.data[((i-1)*w+(j+1))*4+3] +
          idata.data[(i*w+(j-1))*4+3] + idata.data[(i*w+j)*4+3] + idata.data[(i*w+(j+1))*4+3] +
          idata.data[((i+1)*w+(j-1))*4+3] + idata.data[((i+1)*w+j)*4+3] + idata.data[((i+1)*w+(j+1))*4+3]) / 9;
      }
    }
  }
  ctx1.putImageData(idata1, 0, 0);
};
img.src = "https://www.tutorialspoint.com/images/QAicon.png";
