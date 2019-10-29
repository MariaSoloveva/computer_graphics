var canvas = document.getElementById('lab05');
var ctx = canvas.getContext("2d");
var parray = new Array();
var n = 0;
var state = 0;

function fillArea(ctx, x, y) {
  console.log("in fill Area");
  var stack = [];
  stack.push([x, y]);
  while(stack.length !== 0) {
    var el = stack.pop();
      if (ctx.getImageData(el[0], el[1], 1, 1).data[3] != 255) {
        ctx.fillRect(el[0], el[1], 1, 1);
        console.log("doing");
        stack.push([el[0], el[1] - 1]);
        stack.push([el[0] - 1, el[1]]);
        stack.push([el[0], el[1] + 1]);
        stack.push([el[0] + 1, el[1]]);
      }
  }
}





canvas.addEventListener('click', function(e) {
  if (state == 0) {
    parray[2*n] 	= e.offsetX;
    parray[2*n+1] 	= e.offsetY;
    if (n!=0) {
      Line(ctx, parray[2*n], parray[2*n+1],
        parray[2*n-2], parray[2*n-1]);
    }
    n++;
  } else if (state == 1) {
    console.log("go to fill Area");
    fillArea(ctx, e.offsetX, e.offsetY);
  }
});
canvas.oncontextmenu = function() {
  if (n>1) {
    Line(ctx, parray[2*n-2], parray[2*n-1], parray[0], parray[1]);
  }
  state = 1;
  return false;
}
