var canvas = document.getElementById('canvas');

canvas.width = 400;
canvas.height = 400;

var c = canvas.getContext('2d');

var x = 0;
var y = 0;

var steps = 20;
var obstacles = 100;

var squareWidth = canvas.height / steps;
var squareHeight = canvas.height / steps;

var dx = (canvas.width - squareWidth) / (steps - 1);
var dy = (canvas.height - squareHeight) / (steps - 1);

var colorFill = 'rgba(0,0,0,.5)';
var obstacleFill = 'rgba(200,0,0,1)';
var backgroundFill = 'rgba(0,0,0,.15)';

function getDistanceX(x1, x2) {
    return x2 - x1;
}
function getDistanceY(y1, y2) {
    return y2 - y1;
}
function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
class Square {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawSquare() {
        c.fillStyle = this.color;
        c.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

// Controls
addEventListener('keydown', function (e) {
    if (e.keyCode == 39 && x + squareWidth != canvas.width) {
        x += dx;
    } else if (e.keyCode == 37 && x != 0) {
        x -= dx;
    } else if (e.keyCode == 38 && y != 0) {
        y -= dy;
    } else if (e.keyCode == 40 && y + squareHeight != canvas.height) {
        y += dy;
    }
});

var thePlayer;

var obstacleArray = [];
var distanceArrayX = [];
var distanceArrayY = [];
var distanceArray = [];

var backgroundArray = [];
var backgroundDistanceArray = [];

for (var i = 0; i < obstacles; i++) {
    var obstacleX = (canvas.height / steps) * Math.floor(Math.random() * steps);
    var obstacleY = (canvas.height / steps) * Math.floor(Math.random() * steps);
    obstacleArray.push(
        new Square(
            obstacleX,
            obstacleY,
            squareWidth,
            squareHeight,
            obstacleFill
        )
    );
}

let row = 0;
let column = 0;

for (let i = 1; i < steps * steps + 1; i++) {
    var backgroundX = (canvas.height / steps) * column;
    var backgroundY = (canvas.height / steps) * row;
    backgroundArray.push(
        new Square(
            backgroundX,
            backgroundY,
            squareWidth,
            squareHeight,
            backgroundFill
        )
    );
    if (i % steps == 0) {
        row++;
    }
    column = i % steps;
}

function animate() {
    requestAnimationFrame(animate);

    // Draw Player
    thePlayer = new Square(x, y, squareWidth, squareHeight, colorFill);
    c.clearRect(0, 0, innerWidth, innerHeight);

    // Draw Background
    for (let i = 0; i < backgroundArray.length; i++) {
        backgroundArray[i].drawSquare();
        backgroundDistanceArray[i] = getDistance(
            backgroundArray[i].posX,
            backgroundArray[i].posY,
            thePlayer.posX,
            thePlayer.posY
        );
    }
    // Erase Bg
    backgroundArray[backgroundDistanceArray.indexOf(0)].color =
        'rgba(255,255,255,1)';
    console.log(backgroundDistanceArray.indexOf(0));

    // Draw Player
    thePlayer.drawSquare();

    // Draw Obstacles
    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].drawSquare();
        distanceArrayX[i] = getDistanceX(obstacleArray[i].posX, thePlayer.posX);
        distanceArrayY[i] = getDistanceY(obstacleArray[i].posY, thePlayer.posY);
        distanceArray[i] = getDistance(
            obstacleArray[i].posX,
            obstacleArray[i].posY,
            thePlayer.posX,
            thePlayer.posY
        );
    }
    // Detect Obstacles
    if (distanceArray.includes(squareWidth)) {
        colorFill = 'rgba(225,125,0,1)';
    } else {
        colorFill = 'rgba(0,0,0,.5)';
    }
}
animate();
