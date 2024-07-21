import { useState } from "react";
import Square from "./square";

function Board(props) {
  const [state, updateState] = useState([Array(9).fill(null)]);
  const [isNext, updateISNext] = useState(true);
  const [history, updateHistory] = useState([Array(9).fill(null)]);
  const [count, updateCount] = useState(0);
  const undoDisabled = count === 0;

  const calculateWinner = () => {
    const squares = state.slice();
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleUndo = () => {
    let lastState = history[count - 1];
    console.log(lastState);
    updateState(lastState);
    updateCount(count - 1);
    updateISNext(!isNext);
  };
  const handleClick = (index) => {
    const squares = state.slice();
    console.log("SQ", squares);
    squares[index] = isNext ? "X" : "O";
    updateState(squares);
    updateHistory([...history, squares]);
    console.log(history);
    updateCount(count + 1);
    updateISNext(!isNext);
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={state[index]}
        onClick={() => {
          handleClick(index);
        }}
      />
    );
  };
  const renderText = () => {
    let winner = calculateWinner();
    let status = "Next player: " + (isNext ? "X" : "O");
    if (winner) {
      status = "Winner" + winner;
    }
    return <h5>{status}</h5>;
  };
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {renderText()}
      <button
        className="undoButton"
        onClick={() => {
          handleUndo();
        }}
        disabled={undoDisabled}
      >
        Undo
      </button>
    </div>
  );
}
export default Board;
