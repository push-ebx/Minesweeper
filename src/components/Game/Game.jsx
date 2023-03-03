import React, {useState} from 'react';
import styles from './index.module.css'
import Board from "../Board";

const Game = () => {
  return (
    <div className={styles.game}>
      <Board width={16} height={16} mines={40}/>
    </div>
  );
};

export {Game};