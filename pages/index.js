import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import chroma from "chroma-js";
import { useState, useRef, useEffect } from "react";

export default function Home() {

  const canvas = useRef();
  let canvasData, canvasWidth, canvasHeight, ctx;
  const gradient = chroma.scale(['#000000', '#000000', '#ffff00', '#ff8700', '#ff0000']).
        domain([0, 10, 15, 30, 100]);

  const setUp = () => {
    /* let colorPercent = 100; //100 percent is hot, 0 percent is cold
    let aColor = gradient(colorPercent).toString();

    console.log(aColor); */
    canvasWidth = canvas.current.width;
    canvasHeight = canvas.current.height;
    ctx = canvas.current.getContext("2d");
    canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    window.requestAnimationFrame(frame);
  }

  let drawOnePixel = function(x, y, r, g, b, a) {
    //console.log(x, y, r, g, b, a)
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
    
  }



  const frame = () => {

    //console.log("frame")
    window.requestAnimationFrame(frame);
  }


  useEffect(() => {
    setUp();
    drawOnePixel(20, 20, 255, 255, 255, 255);
    ctx.putImageData(canvasData, 0, 0);
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
            <canvas id="myCanvas" ref={canvas} width="200" height="200"></canvas>
        </div>
      </main>
    </>
  )
}
