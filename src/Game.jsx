import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
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
  };

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const aiMove = () => {
    const emptySquares = squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    handleClick(randomMove);
  };

  const winner = calculateWinner(squares);
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (isXNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => {
          handleClick(i);
          if (!isXNext && !calculateWinner(squares)) {
            setTimeout(aiMove, 500); // AI makes a move after player
          }
        }} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

export default Game;
