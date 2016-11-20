var points, 
    numPoints, 
    linkDistance = 150, 
    opacity = 0.4, 
    canvas, 
    ctx, 
    width, 
    width2, 
    height, 
    height2, 
    grad,
    fontRatio = 80 / 1920,
    fontSize;
    
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

function init() {
    clear = false;
    canvas.width = document.body.clientWidth; 
    canvas.height = document.body.clientHeight; 
    width = canvas.width;
    height = canvas.height;
    width2 = width / 2; 
    height2 = height / 2;
    fontSize = width * fontRatio;
    points = [];
    numPoints = Math.floor(width / 10) + Math.floor(height / 5);
    
    grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(.0, '#010C50');
    grad.addColorStop(.3, '#000732');
    grad.addColorStop(1, '#000000');

    for(i = 0; i < numPoints; i++) {
        var lineWidth = between(1, 10);
        
        points.push({
            x:Math.random() * width,
            y:Math.random() * height,
            vx:Math.random() * 5 - 2,
            vy:Math.random() * 5 - 2,
            color: {
                r: between(1, 80),
                g: between(1, 100),
                b: between(200, 255)
            },
            lineWidth: lineWidth 
        });
    }

}

function between(x, y) {
    return Math.floor(Math.random() * y) + x;
}

function move(p) {
    p.x += p.vx;
    p.y += p.vy;
    
    if(p.x > width) {
        p.x = 0;
    } else if(p.x < 0) {
        p.x = width;
    }
    
    if(p.y > height) {
        p.y = 0;
    } else if(p.y < 0) {
        p.y = height;
    }
}

function link(p1, p2) {
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy),
        alpha;
    
    if (dist <= linkDistance) {
        
        if (dist < 10) {
            var t = p2.color;
            p1.color = p2.color;
            p2.color = p1.color;
        }
        
        alpha = opacity - (dist / (1 / opacity)) / linkDistance;

        if (alpha > 0) {   
            drawLine(p1, p2, 'rgba('+ p1.color.r  + ',' + p1.color.g + ',' + p1.color.b + ',' + alpha +')', p1.lineWidth);     
        }
    }
}

function drawLine(p1, p2, strokeStyle, width) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = width;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
}

function drawRect(p1, p2, fillStyle) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle; 
    ctx.fillRect(p1.x, p1.y, p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
}

function drawPoint(p) {
    drawRect(p, { x: 2, y: 2 }, 'rgb('+ p.color.r  + ',' + p.color.g + ',' + p.color.b +')');
}

function drawTitle(text, font) {
    ctx.font = fontSize + 'pt ' + font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, width2, height2 - 50);
}


function drawBackground() {
    drawRect({ x: 0, y: 0}, { x: width, y: height }, grad);
}

function frame() {
    var p1, p2;
    
    ctx.clearRect(0, 0, width, height);
    
    drawBackground();

    for(var i = 0; i < numPoints; i++) {
        p1 = points[i];
        move(p1);
        drawPoint(p1);

        for(var j = i + 1; j < points.length; j++) {
            p2 = points[j];
            link(p1, p2);
        }
    }

    drawTitle('loader', 'Roboto');
}

init();

setInterval(function() {
    frame();
}, 1000 / 24);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    init();
});

