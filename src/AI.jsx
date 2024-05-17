export const calculateBestMove = (squares) => {
    const availableMoves = squares.map((square, index) => square === null ? index : null).filter(val => val !== null);
    if (availableMoves.length === 0) return null;
  
    // For simplicity
  