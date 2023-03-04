import React, {useEffect, useState} from 'react';
import styles from './index.module.css'

const RemainingMines = ({remainingMines}) => {
  const getPath = (digit) => {
    let num = Math.floor(remainingMines / digit) % 10
    if (remainingMines < 0) num = 0
    return process.env.PUBLIC_URL + `./assets/images/${num}.png`
  }

  return (
    <div className={styles.remaining_mines}>
      <img className={styles.number} src={getPath(100)} />
      <img className={styles.number} src={getPath(10)} />
      <img className={styles.number} src={getPath(1)} />
    </div>
  )
}

export {RemainingMines};