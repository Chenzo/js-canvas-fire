
import {fcolor} from './modules/firecolor.js';

window.fireOBJ = {};

$(function(){

var FIRE_WIDTH =  1500;
var FIRE_HEIGHT = 500;
var firePixels=[];

var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    
function rescaleCanvas() {
    ctx.canvas.width  = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
    canvasWidth = canvas.width;
    //canvasHeight = canvas.height;
    FIRE_WIDTH =  canvasWidth;
    canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
}
rescaleCanvas();


function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

// drawPixel(1, 1, 255, 0, 0, 255);

function updateCanvas() {
    ctx.filter = 'blur(20px)';
    ctx.putImageData(canvasData, 0, 0);
}


function setUp() {
    for(var i = 0; i < FIRE_WIDTH*FIRE_HEIGHT; i++) {
        firePixels[i] = 0;
    }

    // Set bottom line to white...
    /* for(var i = 0; i < FIRE_WIDTH; i++) {
        firePixels[(FIRE_HEIGHT-1)*FIRE_WIDTH + i] = 31;
    } */
}
setUp();

var stoppingFire = true;
function stopFire() {
    
        for(var i = 0; i < FIRE_WIDTH; i++) {
            var tt = (FIRE_HEIGHT-1)*FIRE_WIDTH + i;
            var pixel = firePixels[tt];
            if (stoppingFire) {
                if(pixel == 0) {
                    firePixels[tt] = 0;
                } else {
                    var randIdx = Math.round(Math.random() * 3.0) & 3;
                    firePixels[tt] = pixel - (randIdx & 1);
                }
            } else {
                if(pixel == 31) {
                    firePixels[tt] = 31;
                } else {
                    var randIdx = Math.round(Math.random() * 3.0) & 3;
                    firePixels[tt] = pixel + (randIdx & 1);
                }
            }
        }
    
}


function spreadFire(src) {
    var pixel = firePixels[src];
    if(pixel == 0) {
        firePixels[src - FIRE_WIDTH] = 0;
    } else {

        var randIdx = Math.round(Math.random() * 3.0) & 3;
        var dst = src - randIdx + 1;
        dst = src - randIdx + 1;
        firePixels[dst - FIRE_WIDTH ] = pixel - (randIdx & 1);
    }
}


var doFire = function() {
    for(var x=0 ; x < FIRE_WIDTH; x++) {
        for (var y = 1; y < FIRE_HEIGHT; y++) {
            spreadFire(y * FIRE_WIDTH + x);
        }
    }

}

//doFire();


function drawCan() {
    var fC;
    var y;
    var x;
    for(y=0; y < FIRE_HEIGHT; y++) {
        for (x = 0; x < FIRE_WIDTH; x++) {
            var idx = firePixels[y * FIRE_WIDTH + x];
            fC = fcolor[idx];
            drawPixel(x, y, fC[0], fC[1], fC[2], fC[3]);
        }
    }
}

    updateCanvas();

    var ticking = false;
    setTimeout(checkForInView, 10);

    function checkForInView() {
        requestTick();
        setTimeout(checkForInView, 10);
    }
    
    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }
    
    function update() {
        ticking = false;
        stopFire();
        doFire();
        drawCan();

        updateCanvas();

    }
    
    
    
    







    window.fireOBJ.startFire = function() {
        stoppingFire = false;
    }


    window.fireOBJ.stopFire = function() {
        stoppingFire = true;
    }

    $('.js-toggle-blur').click(function() {
        
        var hB = $("#haveBlur:checked").length;
        if (hB > 0) {
            $("#myCanvas").addClass("blurred");
        } else {
            $("#myCanvas").removeClass("blurred");
        }
        
    })

    $('.js-toggle-fire').click(function() {
        //if //var stoppingFire = true;
        console.log("beep");
        if ($(this).hasClass("onFire")) {
            stoppingFire = true;
            $(this).removeClass("onFire");
        } else {
            stoppingFire = false;
            $(this).addClass("onFire");
        }
    }) 
        

});


