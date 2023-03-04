import React, {useEffect, useState} from 'react';
import styles from './index.module.css'

const icons = {
  closed: process.env.PUBLIC_URL + './assets/images/closed.png',
  flag: process.env.PUBLIC_URL + './assets/images/flag.png',
  default_mine: process.env.PUBLIC_URL + './assets/images/default_mine.png',
  cross_mine: process.env.PUBLIC_URL + './assets/images/cross_mine.png',
  red_mine: process.env.PUBLIC_URL + './assets/images/red_mine.png',
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

const Cell = ({cell, onMouseUpCell, onMouseDownCell, onRightClick}) => {
  const [state, setState] = useState('closed')
  useEffect(() => {
    if (cell.is_open && cell.is_cross_mine) {
      setState('cross_mine')
    }
    if (cell.is_open && cell.is_red_mine) {
      setState('red_mine')
    }
    else if (cell.is_open && cell.is_mine) {
      setState('default_mine')
    }
    else if (cell.is_open && !cell.is_mine && !cell.count_neighbours) {
      setState('mine_0')
    }
    else if (cell.is_open && !cell.is_mine && cell.count_neighbours) {
      setState(`mine_${cell.count_neighbours}`)
    }
    else if (!cell.is_open && cell.is_flag) {
      setState('flag')
    }
    else if (!cell.is_open && cell.is_pushed) {
      setState('mine_0')
    }
    else if (!cell.is_open) {
      setState('closed')
    }
  }, [cell.is_mine, cell.count_neighbours, cell.is_open, cell.is_flag, cell.is_pushed])

  return (
    <>
      <img
        className={styles.cell}
        src={icons[state]}
        onMouseUp={(e) => {
          if (e.nativeEvent.button === 0) onMouseUpCell(cell)
        }}
        onMouseDown={(e) => {
          if (e.nativeEvent.button === 0) onMouseDownCell(cell)
        }}
        onContextMenu={(e)=> { // отдельно
          e.preventDefault();
          e.stopPropagation();
          onRightClick(cell)
          return false
        }}
        alt={''}
      />
      {cell.col === cell.width_board-1 && <br/>}
    </>
  );
};

export {Cell};