import React, {useState} from 'react';
import styles from './index.module.css'
import Board from "../Board";

const Game = () => {
  const [is_game, setIs_game] = useState(false)
  const [is_lose_game, setIs_lose_game] = useState(false)
  const [restart, setRestart] = useState(false)

  return (
    <div className={styles.game}>
      <button
        onClick={() => {
          setIs_game(false)
          setIs_lose_game(false)
          setRestart(!restart)
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
      />
    </div>
  );
};

export {Game};