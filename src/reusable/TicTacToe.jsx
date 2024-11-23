import React, { useState } from "react";
import Modal from "./Modal";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
    setWinner(null);
    setIsModalOpen(false);
  };

  const resetScores = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    resetGame();
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }

    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOneTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setIsModalOpen(true);
      if (gameWinner === "X") {
        setPlayerOneScore((prevScore) => prevScore + 1);
      } else {
        setPlayerTwoScore((prevScore) => prevScore + 1);
      }
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      setIsModalOpen(true);
    }

    setIsPlayerOneTurn((prevTurn) => !prevTurn);
  };

  return (
    <div className="flex flex-col gap-2 xsm:gap-4 items-center justify-center rounded-2xl bg-orange-100 p-2 xsm:p-4">
      {/* Title */}
      <p className="text-3xl font-bold text-orange-900 mb-4 xsm:mb-8">Tic-Tac-Toe</p>
      
      {/* Game Header */}
      <div className="flex gap-4 items-center justify-between w-full max-w-xl">
        <div className="text-center bg-orange-400 p-1 xsm:p-2 rounded-2xl border-2 border-orange-950">
          <p className="xsm:text-xl font-bold text-blue-700">Player 1 (X)</p>
          <p className="text-2xl xsm:text-4xl bg-orange-100 w-fit mx-auto px-2 xsm:px-3 rounded-full text-green-500 font-semibold">{playerOneScore}</p>
        </div>
        <div className="text-center bg-orange-400 p-1 xsm:p-2 rounded-2xl border-2 border-orange-950">
          <p className="xsm:text-xl font-bold text-red-700">Player 2 (O)</p>
          <p className="text-2xl xsm:text-4xl bg-orange-100 w-fit mx-auto px-2 xsm:px-3 rounded-full text-green-500 font-semibold">{playerTwoScore}</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 w-full gap-3 xsm:gap-4 ">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`w-16 xsm:w-20 h-16 xsm:h-20 text-center mx-auto rounded-2xl flex items-center justify-center border-2 border-orange-300 bg-orange-50 text-3xl font-bold cursor-pointer ${
              cell === "X" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Game Controls */}
      <div className="flex space-x-4 w-full justify-between">
        <button
          onClick={resetGame}
          className="px-2 xsm:px-4 py-1 xsm:py-2 border-2 border-orange-950 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition"
        >
          Reset Game
        </button>
        <button
          onClick={resetScores}
          className="px-2 xsm:px-4 py-1 xsm:py-2 border-2 border-orange-950 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition"
        >
          Reset Scores
        </button>
      </div>

      {/* Winner Announcement */}
      {/* {winner && (
        <div className="mt-4 p-4 bg-green-200 text-green-700 rounded">
          {winner === "Draw" ? (
            <p className="text-xl font-semibold">It's a Draw!</p>
          ) : (
            <p className="text-xl font-semibold">
              {winner === "X" ? "Player 1" : "Player 2"} Wins!
            </p>
          )}
        </div>
      )} */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={winner === "Draw" ? "It's a Draw!" : `${winner === "X" ? "Player 1" : "Player 2"} Wins!`}
        message="Click 'Okay' to continue."
      />
    </div>
  );
};

export default TicTacToe;
