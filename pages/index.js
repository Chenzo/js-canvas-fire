import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

export default function Home() {
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
                <label for="haveBlur">Apply Blur</label>
            </div>
        </div>

        <div className={styles.canvasholder}>
            <canvas id="myCanvas" width="1500" height="500"></canvas>
        </div>
      </main>
    </>
  )
}
