import { WINNER_COMBOS } from "../Constants.js";

export const checkWinner = (boardToCheck) => {
  // Revisamos todas las combinaciones ganadoras
  // para ver si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null;
};
