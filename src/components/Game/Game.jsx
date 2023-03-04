import React, {useEffect, useState} from 'react';
import styles from './index.module.css'
import Board from "../Board";
import Stopwatch from "../Stopwatch";
import RemainingMines from "../RemainingMines";

const RestartButton = ({onMouseUpHandle, onMouseDownHandle, stateRestartButton}) => {
  return (
    <img
      style={{width: '40px'}}
      src={process.env.PUBLIC_URL + `./assets/images/${stateRestartButton}.png`}
      onMouseUp={() => onMouseUpHandle()}
      onMouseDown={() => onMouseDownHandle()}
    />
  )
}

const Game = () => {
  const [is_game, setIs_game] = useState(false)
  const [is_lose_game, setIs_lose_game] = useState(false)
  const [restart, setRestart] = useState(false)
  const [remainingMines, setRemainingMines] = useState(0) // 40
  const [stateRestartButton, setStateRestartButton] = useState('default_smile')

  const RestartButtonUp = () => {
    setStateRestartButton('default_smile')
    setIs_game(false)
    setIs_lose_game(false)
    setRestart(!restart)
    setRemainingMines(40)
  }

  const RestartButtonDown = () => {
    setStateRestartButton('pushed_smile')
  }

  useEffect(() => {
    if (is_lose_game) setStateRestartButton('lose_smile')
  }, [is_lose_game])

  return (
    <div className={styles.game}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <RemainingMines remainingMines={remainingMines}/>
          <RestartButton
            onMouseUpHandle={RestartButtonUp}
            onMouseDownHandle={RestartButtonDown}
            stateRestartButton={stateRestartButton}
          />
          <Stopwatch is_launched={is_game && !is_lose_game} is_clear={restart}/>
        </div>
        <Board
            width={16}
            height={16}
            mines={40}
            is_game={is_game}
            is_lose_game={is_lose_game}
            setIs_game={setIs_game}
            setIs_lose_game={setIs_lose_game}
            restart={restart}
            setRemainingMines={setRemainingMines}
            setStateRestartButton={setStateRestartButton}
        />
      </div>
    </div>
  );
};

export {Game};