
import {fcolor} from './modules/firecolor.js';

$(function(){

var FIRE_WIDTH =  500;
var FIRE_HEIGHT = 149;

var firePixels=[];

var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);


// That's how you define the value of a pixel //
function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}


// That's how you update the canvas, so that your //
// modification are taken in consideration //
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}


/* drawPixel(1, 1, 255, 0, 0, 255);
drawPixel(2, 1, 255, 0, 0, 255);
drawPixel(3, 1, 255, 0, 0, 255);



for (var t=1; t <=500; t++) {
	drawPixel(t, 149, 255, 255, 255, 255);

}

for (var u=149; u>0; u--) {
    var rand = Math.round(Math.random() * 3.0) & 3;
    console.log(rand);
    drawPixel(3, u, 255, 255, 255, 255);
}
updateCanvas(); */

function setUp() {
// Set whole screen to 0 (color: 0x07,0x07,0x07)
    for(var i = 0; i < FIRE_WIDTH*FIRE_HEIGHT; i++) {
        firePixels[i] = 0;
    }

    // Set bottom line to 37 (color white: 0xFF,0xFF,0xFF)
    for(var i = 0; i < FIRE_WIDTH; i++) {
        firePixels[(FIRE_HEIGHT-1)*FIRE_WIDTH + i] = 31;
    }
}

setUp();

function spreadFire(src) {
    var pixel = firePixels[src];
    if(pixel == 0) {
        firePixels[src - FIRE_WIDTH] = 0;
    } else {

        var randIdx = Math.round(Math.random() * 3.0) & 3;
        var dst = src - randIdx + 1;
        firePixels[dst - FIRE_WIDTH ] = pixel - (randIdx & 1);
    }
}

var fC;
var doFire = function() {
    for(var x=0 ; x < FIRE_WIDTH; x++) {
        for (var y = 1; y < FIRE_HEIGHT; y++) {
            spreadFire(y * FIRE_WIDTH + x);
        }
    }
}

doFire();


function drawCan() {
    var fC;
    var y;
    var x;
    for(y=0; y < FIRE_HEIGHT; y++) {
        for (x = 0; x < FIRE_WIDTH; x++) {
            var idx = firePixels[y * FIRE_WIDTH + x];
            fC = fcolor[idx];
            //console.log(fC);
            drawPixel(x, y, fC[0], fC[1], fC[2], fC[3]);
        }
    }
}
drawCan();
/* console.log(firePixels[74000]);

var fC = fcolor[firePixels[74000]];
console.log(fC); */
    //var rand = Math.round(Math.random() * 3.0) & 3;
    //console.log(rand);

    //drawPixel(3, u, 255, 255, 255, 255);

updateCanvas();

//var theColor = ctx.getImageData(2, 149, 1, 1).data; 
//console.log(theColor);


var fireLoop = function() {
    doFire();
    drawCan();
    updateCanvas();
    setTimeout(fireLoop, 100);
}

    fireLoop();    
});





