import React, {useEffect, useState} from 'react';
import styles from './index.module.css'
import Cell from "../Cell";

const Board = ({width, height, mines, is_game, setIs_game, is_lose_game, setIs_lose_game, restart}) => {
  const [cells, setCells] = useState([])

  const get_array_mines = (row_first, col_first) => {
    if (mines >= width*height) return
    const array_numbers = []
    const index_first_cell = width*row_first + col_first
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
            is_flag: false,
            is_pushed: false,
            is_cross_mine: false,
            is_red_mine: false,
            count_neighbours: 0,
            width_board: width
          }
        )
      }
    }
    setCells(_cells)
  }

  const start_game = (row_first, col_first) => {
    const array_mines = get_array_mines(row_first, col_first)
    const _cells = [...cells]
    array_mines.forEach(mine => {
      let r = mine.row, c = mine.col
      _cells[r][c].is_mine = true
      let delta = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
      delta.forEach(d => {
        if (r + d[0] >= 0 && r + d[0] < height && c + d[1] >= 0 && c + d[1] < width) {
          if(!_cells[r+d[0]][c+d[1]].is_mine) {
            _cells[r+d[0]][c+d[1]].count_neighbours++
          }
        }
      })
    })

    setCells(_cells)
    setIs_game(true)
  }

  const updateCell = (_row, _col, new_cell) => {
    const _cells = [...cells];
    _cells[_row][_col] = new_cell
    setCells(_cells)
  }

  const emptyCell = (row, col) => {
    const _cells = [...cells]
    const queue = [_cells[row][col]]
    const marked_cells = []

    while (queue.length) { // check bombs
      let curr = queue.shift()
      let row_curr = curr.row, col_curr = curr.col
      _cells[row_curr][col_curr].visited = true
      marked_cells.push({row: row_curr, col: col_curr})

      if (_cells[row_curr][col_curr].count_neighbours) continue

      for (let dx of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          if (
              row_curr+dy >= 0 &&
              col_curr+dx >= 0 &&
              row_curr+dy < height &&
              col_curr+dx < width &&
              !_cells[row_curr+dy][col_curr+dx].visited)
          {
            queue.push(_cells[row_curr+dy][col_curr+dx])
          }
        }
      }
    }
    
    marked_cells.forEach(cell => {
      _cells[cell.row][cell.col].is_open = true
    })
    setCells(_cells)
  }

  const openMap = () => {
    const _cells = [...cells]
    _cells.map(row => row.map(cell => cell.is_open = true))
    setCells(_cells)
  }

  const openCell = (row, col) => {
    if (cells[row][col].is_flag) return
    if (!cells[row][col].count_neighbours && !cells[row][col].is_mine) emptyCell(row, col)
    if (!cells[row][col].is_open && cells[row][col].is_mine) {
      updateCell(row, col, {...cells[row][col], is_open: true, is_red_mine: true})
    }
    if (!cells[row][col].is_open) updateCell(row, col, {...cells[row][col], is_open: true})
  }

  const onMouseUpCell = ({row, col}) => {
    if (is_lose_game) return
    if (!cells[row][col].is_open) updateCell(row, col, {...cells[row][col], is_pushed: false})
    if (!is_game) start_game(row, col)
    openCell(row, col)
    if (cells[row][col].is_mine) { // отдельно
      openMap()
      setIs_lose_game(true)
    } // lose
  }

  const onMouseDownCell = ({row, col}) => {
    if (is_lose_game) return
    if (cells[row][col].is_flag) return
    if (!cells[row][col].is_open) updateCell(row, col, {...cells[row][col], is_pushed: true})
  }

  const onRightClick = ({row, col}) => {
    if (is_lose_game) return
    updateCell(row, col, {...cells[row][col], is_flag: !cells[row][col].is_flag})
  }

  useEffect(() => {
    initBoard()
  }, [restart])

  return (
    <div className={styles.board}>
      {
        cells.length
          ?
        cells.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={width*i + j + 1}
                cell={cell}
                onMouseUpCell={onMouseUpCell}
                onMouseDownCell={onMouseDownCell}
                onRightClick={onRightClick}
              />
            )
          })
        })
          : ""
      }
    </div>
  );
};

export {Board};