
export type WordGridProps = {
    guesses: string[];
    wordLength: number;
    getGuessStatus: (guess: string) => string[];
  };


export type KeyboardProps = {
    onKeyPress: (key: string) => void;
    currentGuess: string;
    onEnterPress: () => void; 
  };
  
  
  
  