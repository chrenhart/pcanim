const canvas = document.getElementById('canvas1');

var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;

var point = createPoint(w, h);
var colour = getColor();
var vector = createVector();
var rad = 60;
var mul = Math.random() * 0.7 + 0.3;
var counter = 0;
var jump = getInt(600, 1200);

var iv;
var isRunning = false;
function startAnimation() {
    let btn = document.getElementById('btn_start');
    if (isRunning) {
        iv = clearInterval(iv);
        isRunning = false;
        btn.innerHTML = 'Start'
    } else {
        iv = setInterval(paint, 10);
        isRunning = true;
        btn.innerHTML = 'Stop'
    }
}

function resetAnimation() {
    isRunning = true;
    startAnimation();
    clear();
}

function download_img(el) {    
    var imageURI = canvas.toDataURL("image/png");
    el.href = imageURI;
}

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
        if (counter % 13 == 0) {
            dropCircles();
        }
    }
    
    if (rad < 1) {
        rad = 60;
        point = createPoint(w, h);
        colour = getColor();
        vector.x *= 0.7;
        vector.y *= 0.7;
    } else if (rad > 100) {
        rad = 60;
        point = createPoint(w, h);
        colour = getColor();
        vector.x *= 0.8;
        vector.y *= 0.8;
        mul *= -1;
    }

    vector.x += (counter % 99) * 0.0005;
    vector.y += (counter % 99) * 0.0005;
    
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
        jump = getInt(600, 1200);
        vector = createVector();
        dropCircles();
    }
}

function dropCircles() {
    let n = getInt(1, 3);
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        let p2x = point.x + getInt(-300, 300);
        let p2y = point.y + getInt(-300, 300);
        ctx.arc(p2x, p2y, getInt(2, 30), 0, 2 * Math.PI);
        ctx.fillStyle = getColor();
        ctx.fill();
        ctx.closePath();
    }
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}

function getColor() {
    var cols = ['Crimson', 'DarkSlateBlue', 'Coral', '#14847b', '#6d6d6d', 'White'];
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
