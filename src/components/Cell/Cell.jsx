import React, {useEffect, useState} from 'react';
import styles from './index.module.css'

const icons = {
  closed: process.env.PUBLIC_URL + './assets/images/closed.png',
  flag: process.env.PUBLIC_URL + './assets/images/flag.png',
  default_mine: process.env.PUBLIC_URL + './assets/images/default_mine.png',
  mine_0: process.env.PUBLIC_URL + './assets/images/on_down.png',
  mine_1: process.env.PUBLIC_URL + './assets/images/1_mine.png',
  mine_2: process.env.PUBLIC_URL + './assets/images/2_mine.png',
  mine_3: process.env.PUBLIC_URL + './assets/images/3_mine.png',
  mine_4: process.env.PUBLIC_URL + './assets/images/4_mine.png',
  mine_5: process.env.PUBLIC_URL + './assets/images/5_mine.png',
  mine_6: process.env.PUBLIC_URL + './assets/images/6_mine.png',
  mine_7: process.env.PUBLIC_URL + './assets/images/7_mine.png',
  mine_8: process.env.PUBLIC_URL + './assets/images/8_mine.png',
}

const Cell = ({cell, onMouseUpCell}) => {
  const [state, setState] = useState('closed')
  useEffect(() => {
    if (cell.is_open && cell.is_mine) {
      setState('default_mine')
    }
    else if (cell.is_open && !cell.is_mine && !cell.count_neighbours) {
      setState('mine_0')
    }
    else if (cell.is_open && !cell.is_mine && cell.count_neighbours) {
      setState(`mine_${cell.count_neighbours}`)
    }
    else if (!cell.is_open) {
      setState('closed')
    }
  }, [cell.is_mine, cell.count_neighbours, cell.is_open])

  return (
    <>
      <img
        className={styles.cell}
        src={icons[state]}
        onMouseUp={() => onMouseUpCell(cell)}
        alt={''}
      />
      {cell.col === cell.width_board-1 && <br/>}
    </>
  );
};

export {Cell};