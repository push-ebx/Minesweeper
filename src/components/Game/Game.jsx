import React, {useState} from 'react';
import styles from './index.module.css'
import Board from "../Board";
import Stopwatch from "../Stopwatch";
import RemainingMines from "../RemainingMines";

const Game = () => {
  const [is_game, setIs_game] = useState(false)
  const [is_lose_game, setIs_lose_game] = useState(false)
  const [restart, setRestart] = useState(false)
  const [remainingMines, setRemainingMines] = useState(0) // 40

  return (
    <div className={styles.game}>
      <RemainingMines remainingMines={remainingMines}/>
      <Stopwatch is_launched={is_game && !is_lose_game} is_clear={restart}/>
      <button
        onClick={() => {
          setIs_game(false)
          setIs_lose_game(false)
          setRestart(!restart)
          setRemainingMines(40)
        }}
      >
        reload
      </button>
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
      />
    </div>
  );
};

export {Game};