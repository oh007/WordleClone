import React from "react";
import "./WordGrid.css";

interface WordGridProps {
  guesses: string[];
  getGuessStatus: (guess: string) => string[];
  currentGuess: string;
}

const WordGrid: React.FC<WordGridProps> = ({
    guesses,
    getGuessStatus,
    currentGuess,
  }) => {
    const rows = Array(6).fill(null);
    const maxCells = 5;
  
    return (
      <div className="word-grid">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="word-row">
            {Array(maxCells).fill(null).map((__, cellIndex) => {
              let letter = guesses[rowIndex]?.[cellIndex] || "";
              let status = "gray"; 
              if (rowIndex === guesses.length && cellIndex < currentGuess.length) {
                letter = currentGuess[cellIndex];
              } else if (guesses[rowIndex]) {
                status = getGuessStatus(guesses[rowIndex])[cellIndex];
              }
              return (
                <div key={cellIndex} className={`word-cell ${status}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

export default WordGrid;