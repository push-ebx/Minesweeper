import React, {useEffect, useState} from 'react';
import styles from './index.module.css'

const Stopwatch = ({is_launched, is_clear}) => {
  const [seconds, setSeconds] = useState(0)
  const [stopwatch, setStopwatch] = useState(null)
  const [numbers, setNumbers] = useState([0, 0, 0])

  useEffect(() => {
    if (is_launched) {
      setStopwatch(setInterval(() => setSeconds(prev => prev+1), 1000))
    } else {
      clearInterval(stopwatch)
    }
  }, [is_launched])

  useEffect(() => {
    setSeconds(0)
  }, [is_clear])

  const getPath = (digit) => {
    let num = seconds > 999 ? 9 : Math.floor(seconds / digit) % 10
    return process.env.PUBLIC_URL + `./assets/images/${num}.png`
  }

  return (
    <div className={styles.stopwatch}>
      <img className={styles.number} src={getPath(100)} />
      <img className={styles.number} src={getPath(10)} />
      <img className={styles.number} src={getPath(1)} />
    </div>
  )
}

export {Stopwatch};