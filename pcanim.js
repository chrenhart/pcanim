const canvas = document.getElementById('canvas1');

const nPoints = 2;
const nRads = 13;

var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;

var point;
var colour = getColor();
var vector = createVector();
var rad = 60;
var mul = Math.random() * 0.7 + 0.3;
var counter = 0;
var jump = getInt(60, 500);

const iv = setInterval(paint, 20);

//function init() {
//    point = createPoint(w, h);
//    colour = getColor();
//}


window.onload = function() {
    w = window.innerWidth;
    h = window.innerHeight;
    
    canvas.width = w;
    canvas.height = h;
    
    ctx.fillStyle = 'White';
    ctx.fillRect(0, 0, w, h);
    point = createPoint(w, h);
    paint();
    console.log('done');
       
}

function paint() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = colour;
    
    if (counter > 5) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    
    point.x += vector.x;
    point.y += vector.y;
    
    
    rad += mul;
    
    if (counter % getInt(5, 25) == 0) {
        mul *= -1;
    }
    
    if (rad < 10) {
        rad += 30;
        colour = getColor();
    }

    vector.x += (counter % 61) * 0.003;
    vector.y += (counter % 61) * 0.003;
    
    if ((point.x > 0) && (point.x > w)) {
        vector.x *= -1;
    }
    
    if ((point.x < 0) && (point.x < 0)) {
        vector.x *= -1;
    }
    
    if ((point.y > 0) && (point.y > h)) {
        vector.y *= -1;
    }
    
    if ((point.y < 0) && (point.y < 0)) {
        vector.y *= -1;
    }
    
    counter++;
    
    if (counter == jump) {
        colour = getColor();
        point.x = getInt(0, w);
        point.y = getInt(0, h);
        counter = 0;
        jump = getInt(60, 500);
        
        let n = getInt(1, 7);
        for (let i = 0; i < n; i++) {
            ctx.beginPath();
            let p2 = createPoint(w, h);
            ctx.arc(p2.x, p2.y, getInt(2, 30), 0, 2 * Math.PI);
            ctx.fillStyle = getColor();
            ctx.fill();
            ctx.closePath();
        }
    }
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}


function getColor() {
    var cols = ['Crimson', 'DarkSlateBlue', 'Coral', '#14847b', '#6d6d6d'];
    return cols[Math.floor(Math.random() * cols.length)]
}

function createPoint(w, h) {
    var p = {
        x: getInt(0, w),
        y: getInt(0, h)
    }
    return p;
}

function createVector() {
    var vector = {
        x: getInt(0, 5),
        y: getInt(0, 5)
    }
    return vector;
}

function getInt(min, max) {
    return Math.floor(Math.random() * max) + min + 1;
}