import React, {useEffect, useState} from 'react';
import styles from './index.module.css'
import Cell from "../Cell";

const Board = ({width, height, mines}) => {
  const [cells, setCells] = useState([])
  //updateCell(1,5, {...cells[1][5], is_open: true})

  const get_array_of_mines = (row_first, col_first) => {
    const array_numbers = []
    const index_first_cell = height*row_first + col_first + 1
    while (array_numbers.length < mines) {
      let number = Math.floor(Math.random() * (width*height))
      if(array_numbers.indexOf(number) === -1 && index_first_cell !== number) {
        array_numbers.push(number);
      }
    }
    return array_numbers.map(num => ({row: Math.floor(num / height), col: num % width}))
  }

  const initBoard = () => {
    const _cells = [];
    for (let row = 0; row < height; row++) {
      _cells.push([])
      for (let col = 0; col < width; col++) {
        _cells[row].push({
            row,
            col,
            is_mine: false,
            is_open: false,
            count_neighbors: 0,
            width_board: width
          }
        )
      }
    }
    setCells(_cells)
  }

  const updateCell = (_row, _col, new_cell) => {
    const _cells = [...cells];
    _cells[_row][_col] = new_cell
    setCells(_cells)
  }

  useEffect(() => initBoard(), [])

  return (
    <div className={styles.board}>
      {
        cells.length
          &&
        cells.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={width*i + j + 1}
                cell={cell}
              />
            )
          })
        })
      }
      {/*{ cells.length && cells }*/}
    </div>
  );
};

export {Board};