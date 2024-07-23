import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/square.jsx";
import { TURNS } from "./Constants.js";
import { checkWinner } from "./logic/board.js";
import { WinnerModal } from "./components/winnerModal.jsx";
import "./App.css";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  //null Es que no hay ganador y false es que hay empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const checkEndGame = (newBoard) => {
    //Revisar si hay empate
    return newBoard.every((square) => square !== null);
  };
  const updateBoard = (index) => {
    //No actualizamos esta posición
    //Si ya tiene algo
    if (board[index] || winner) return; // Si ya hay algo en esa casilla, no hacemos nada
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //Guardar aquí partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
