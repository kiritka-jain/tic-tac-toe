import { useState } from "react";
import Square from "./square";

function Board(props){
    console.log(props.squares)
    const [state,updateState] = useState([Array(9).fill(null)]);
    const [isNext,updateISNext] = useState(true);
   

      const calculateWinner=()=>{
        const squares = state.slice()
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
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            }
          }
          return null;
        
    }
    const handleClick = (index)=> {
        const squares = state.slice()
        squares[index] = isNext ? 'X' : 'O';
        updateState(squares);
        updateISNext(!isNext);
      };

    const renderSquare = (index)=>{
        return (
            <Square value={state[index]} onClick={()=>{handleClick(index)}}/>
        )
    }
    const renderText = ()=>{
        let winner = calculateWinner();
        let status = 'Next player: ' + (isNext ? 'X' : 'O');
        if (winner){
            status = "Winner" + winner;
        }
        return(
            <h5>{status}</h5>
        );
        
    }
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
        </div>
      );
}
export default Board;