import Board from "./board";
import { useState } from "react";

function Game() {

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          />
        </div>
      </div>
    );
  }

export default Game;