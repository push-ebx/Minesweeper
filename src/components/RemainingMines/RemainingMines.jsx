import React, {useEffect, useState} from 'react';
import styles from './index.module.css'

const RemainingMines = ({remainingMines}) => {
  const getPath = (digit) => {
    let num = Math.floor(remainingMines / digit) % 10
    return process.env.PUBLIC_URL + `./assets/images/${num}.png`
  }

  return (
    <div className={styles.remaining_mines}>
      <img src={getPath(100)} />
      <img src={getPath(10)} />
      <img src={getPath(1)} />
    </div>
  )
}

export {RemainingMines};