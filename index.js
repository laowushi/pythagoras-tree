var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function draw(b) {
    ctx.beginPath();
    ctx.moveTo(b.x0, b.y0);
    ctx.lineTo(b.x1, b.y1);
    ctx.lineTo(b.x2, b.y2);
    ctx.lineTo(b.x3, b.y3);
    ctx.lineTo(b.x0, b.y0);
    ctx.fillStyle = "red";
    ctx.fill();
}
function left(b) {
    var angle = b.angle + Math.PI / 4;
    var length = b.length / Math.sqrt(2);
    var x3 = b.x0;
    var y3 = b.y0;
    var x2 = x3 + length * Math.cos(angle - Math.PI / 2);
    var y2 = y3 - length * Math.sin(angle - Math.PI / 2);
    var x1 = x3 + b.length * Math.cos(angle - Math.PI / 4);
    var y1 = y3 - b.length * Math.sin(angle - Math.PI / 4);
    var x0 = x3 + length * Math.cos(angle);
    var y0 = y3 - length * Math.sin(angle);
    return {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
        length: length,
        angle: angle
    };
}
function right(b) {
    var angle = b.angle - Math.PI / 4;
    var length = b.length / Math.sqrt(2);
    var x2 = b.x1;
    var y2 = b.y1;
    var x1 = x2 + length * Math.cos(angle);
    var y1 = y2 - length * Math.sin(angle);
    var x0 = x2 + b.length * Math.cos(angle + Math.PI * 1 / 4);
    var y0 = y2 - b.length * Math.sin(angle + Math.PI * 1 / 4);
    var x3 = x2 + length * Math.cos(angle + Math.PI / 2);
    var y3 = y2 - length * Math.sin(angle + Math.PI / 2);
    return {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
        length: length,
        angle: angle
    };
}
function pytha(b, maxlevel) {
    if (maxlevel > 0) {
        draw(b);
        pytha(left(b), maxlevel - 1);
        pytha(right(b), maxlevel - 1);
    }
}
pytha({
    x0: canvas.width / 2,
    y0: canvas.height / 3 * 2 - 128,
    x1: canvas.width / 2 + 128,
    y1: canvas.height / 3 * 2 - 128,
    x2: canvas.width / 2 + 128,
    y2: canvas.height / 3 * 2,
    x3: canvas.width / 2,
    y3: canvas.height / 3 * 2,
    length: 128,
    angle: Math.PI / 2
}, 10);
