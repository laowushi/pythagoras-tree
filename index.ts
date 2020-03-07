var canvas = <HTMLCanvasElement>document.getElementById("canvas")
var ctx = canvas.getContext("2d")

type BlockType = {
    x0:number;
    y0:number;
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    x3:number;
    y3:number;
    length:number
    angle: number
}

function draw(b: BlockType):void {
    ctx.beginPath()
    ctx.moveTo(b.x0, b.y0)
    ctx.lineTo(b.x1, b.y1)
    ctx.lineTo(b.x2, b.y2)
    ctx.lineTo(b.x3, b.y3)
    ctx.lineTo(b.x0, b.y0)

    ctx.fillStyle = "red"
    ctx.fill()
}

function left(b: BlockType): BlockType {
    let angle = b.angle + Math.PI / 4
    let length = b.length / Math.sqrt(2)
    let x3 = b.x0
    let y3 = b.y0
    let x2 = x3 + length * Math.cos(angle-Math.PI/2)
    let y2 = y3 - length * Math.sin(angle-Math.PI/2)
    let x1 = x3 + b.length * Math.cos(angle-Math.PI/4)
    let y1 = y3 - b.length * Math.sin(angle-Math.PI/4)
    let x0 = x3 + length * Math.cos(angle)
    let y0 = y3 - length * Math.sin(angle)
    return {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
        length: length ,
        angle: angle
    }
}

function right(b: BlockType): BlockType {
    let angle = b.angle - Math.PI / 4
    let length = b.length / Math.sqrt(2)
    let x2 = b.x1
    let y2 = b.y1
    let x1 = x2 + length * Math.cos(angle)
    let y1 = y2 - length * Math.sin(angle)
    let x0 = x2 + b.length * Math.cos(angle+Math.PI*1/4)
    let y0 = y2 - b.length * Math.sin(angle+Math.PI*1/4)
    let x3 = x2 + length * Math.cos(angle+Math.PI/2)
    let y3 = y2 - length * Math.sin(angle+Math.PI/2)
    return {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
        length: length ,
        angle: angle
    }
}

function pytha(b: BlockType, maxlevel: number):void {
    if (maxlevel>0) {
        draw(b)
        pytha(left(b), maxlevel-1)
        pytha(right(b), maxlevel-1)
    }
}

pytha({
    x0:canvas.width/2,
    y0: canvas.height/3*2 - 128,
    x1:canvas.width/2 + 128,
    y1: canvas.height/3*2 - 128,
    x2: canvas.width/2 + 128,
    y2: canvas.height/3*2,
    x3: canvas.width/2,
    y3:canvas.height/3*2,
    length: 128,
    angle: Math.PI/2
},10)