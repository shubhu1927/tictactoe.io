import React, { useState } from "react";
import CheckWinner from "../src/tictacwinner";

const Tictac = ({ size = 3 }) => {
  let Intialboard = () =>
    Array.from({ length: size }, () => {
      return Array(size).fill(null);
    });
  const [board, setBoard] = useState(Intialboard());
  const [turnX, setTurnX] = useState(true);
  // const [colorX, setColorX] = useState(true);
  const Winner = CheckWinner(board, size);
  const status = Winner
    ? `WINNER is ${Winner}`
    : turnX
    ? "PLAYER X TURN"
    : "PLAYER 0 TURN";
  const reset = () => {
    setBoard(Intialboard());
    setTurnX(true);
  };

  console.log(board);
  const handleClick = (rowIdx, colIdx) => {
    if (board[rowIdx][colIdx] || Winner) return; // Prevent overwriting
    const newBoard = board.map((row, r) =>
      row.map((cell, c) =>
        r === rowIdx && c === colIdx ? (turnX ? "X" : "0") : cell
      )
    );
    setBoard(newBoard);
    setTurnX(!turnX);
  };
  return (
    <>
      <div style={{ color: Winner ? "green" : turnX ? "blue" : "chocolate" }}>
        {status}
      </div>
      <div onClick={reset}>Reset</div>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 100px)`,
          gap: "0.5rem",
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleClick(rowIdx, colIdx)}
              className="cell"
              style={{
                color: Winner
                  ? "green"
                  : cell === "X"
                  ? "blue"
                  : cell === "0"
                  ? "chocolate"
                  : "black",
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Tictac;
