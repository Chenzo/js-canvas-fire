import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { fcolor } from '@/lib/firecolor'
import { useState, useRef, useEffect } from "react";

export default function Home() {


  let ticking = false;

  let tColor = [];
  let fireHeight = 2;
  let FIRE_WIDTH = 100;
  let FIRE_HEIGHT = 100;
  let firePixels = [];
  let fireBlur = false;
  const canvas = useRef();
  let stoppingFire = false;
  let canvasData, canvasWidth, canvasHeight, ctx;


  for (let v=0; v<fcolor.length; v++) {
      for (let h=0; h<fireHeight; h++) {
          tColor.push(fcolor[v]);
      }
  }  
  

  const checkForTick = function() {
    requestTick();
    setTimeout(checkForTick, 2000);
  }

  const requestTick = function() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    ticking = false;
    doFire();
    drawCan();
    updateCanvas();
    //console.log("update");
  }


  const setUp = function() {
    canvasWidth = canvas.current.width;
    canvasHeight = canvas.current.height;
    ctx = canvas.current.getContext("2d");
    //ctx.canvas.width  = window.innerWidth;
    FIRE_WIDTH =  canvasWidth;
    canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    for(var i = 0; i < FIRE_WIDTH*FIRE_HEIGHT; i++) {
      firePixels[i] = 0;
    }
  }


  let doFire = function() {
    for(let x=0 ; x < FIRE_WIDTH; x++) {
      for (let y = 1; y < FIRE_HEIGHT; y++) {
          spreadFire(y * FIRE_WIDTH + x);
      }
    }
  }

  let spreadFire = function(src) {
    let pixel = firePixels[src];
    //if(pixel == 0) {
    //    firePixels[src - FIRE_WIDTH] = 0;
    //} else {

      let randIdx = Math.round(Math.random() * 3.0) & 3;
      let dst = src - randIdx + 1;
      dst = src - randIdx + 1;


      let newVal = pixel - (randIdx & 1);
      if (newVal < 0) { newVal = 0;}
      firePixels[dst - FIRE_WIDTH ] = newVal;
    //}
  }

  let drawCan = function() {
    let fC;
    let y;
    let x;
    for(y=0; y < FIRE_HEIGHT; y++) {
        for (x = 0; x < FIRE_WIDTH; x++) {
          let idx = firePixels[y * FIRE_WIDTH + x];
          fC = tColor[idx];
          drawPixel(x, y, fC[0], fC[1], fC[2], fC[3]);
        }
    }
  }


  let drawPixel = function(x, y, r, g, b, a) {
    //console.log(x, y, r, g, b, a)
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
    
  }


let updateCanvas = function() {
  ctx.putImageData(canvasData, 0, 0);
  if (fireBlur) {
      //this looks better than teh CSS version, but is way more processor intensive
      //stackBlurCanvasRGBA("myCanvas", 0, 0, canvasWidth, canvasHeight, 2);
  }
}

  useEffect(() => {
    setUp();
    doFire();
    drawCan();
    updateCanvas();
    //drawPixel(55, 55, 255, 0, 0, 255);
    //updateCanvas();
    //checkForTick();
  }, []);



  return (
    <>
      <Head>
        <title>JS CANVAS FIRE</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
     
      <main className={styles.home_fire}>
        <div className={styles.overCanvas}>
            <button>Toggle Fire</button>

            <div className={styles.checkbox}>
                <input type="checkbox" id="haveBlur" />
                <label htmlFor="haveBlur">Apply Blur</label>
            </div>
        </div>

        <div className={styles.canvasholder}>
            <canvas id="myCanvas" ref={canvas} width="100" height="100"></canvas>
        </div>
      </main>
    </>
  )
}
