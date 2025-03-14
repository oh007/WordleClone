import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import WordGrid from "./WordGrid";
import Keyboard from "./Keyboard";
import RulesModal from "./RulesModal";
import WinModal from "./WinModal";
import confetti from "canvas-confetti";
import "./Wordle.css";

interface WordleProps {
  wordList?: string[];
}

const Wordle = forwardRef<unknown, WordleProps>(({ wordList }, ref) => {
  const [correctWord, setCorrectWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showRules, setShowRules] = useState(true);
  const [winAudio, setWinAudio] = useState<HTMLAudioElement | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    const hasShownRules = localStorage.getItem("hasShownRules");
    if (hasShownRules) {
      setShowRules(false);
    } else {
      localStorage.setItem("hasShownRules", "true");
    }
  }, []);

  useEffect(() => {
    if (wordList && wordList.length > 0) {
      setCorrectWord(wordList[Math.floor(Math.random() * wordList.length)]);
    } else {
      fetch("/data/words.txt")
        .then((response) => response.text())
        .then((text) => {
          const words = text.split("\n").map((word) => word.trim());
          setCorrectWord(words[Math.floor(Math.random() * words.length)]);
        });
    }
  }, [wordList]);

  useEffect(() => {
    const newAudio = new Audio("/winsound.mp3");
    setWinAudio(newAudio);
  }, []);

  const handleOpenRules = () => {
    setShowRules(true);
  };

  const handleCloseRules = () => {
    setShowRules(false);
  };

  const handleKeyPress = (key: string) => {
    if (currentGuess.length < correctWord.length && !gameOver) {
      setCurrentGuess((prevGuess) => prevGuess + key);
    }
  };

  const handleEnterPress = () => {
    if (currentGuess.length === correctWord.length) {
      setGuesses((prevGuesses) => [...prevGuesses, currentGuess]);
      if (currentGuess === correctWord) {
        setGameOver(true);
        setShowWinModal(true);
        if (winAudio) {
          winAudio.play();
        }
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      setCurrentGuess("");
    } else {
      alert("Inte tillräckligt många bokstäver!");
    }
  };

  const getGuessStatus = (guess: string): string[] => {
    const result = guess.split("").map(() => "gray");
    const correctWordArray = correctWord.split("");

    guess.split("").forEach((letter, index) => {
      if (letter === correctWord[index]) {
        result[index] = "correct";
        correctWordArray[index] = "";
      }
    });

    guess.split("").forEach((letter, index) => {
      if (result[index] !== "correct" && correctWordArray.includes(letter)) {
        result[index] = "yellow";
        correctWordArray[correctWordArray.indexOf(letter)] = "";
      }
    });

    return result;
  };

  useImperativeHandle(ref, () => ({
    getGuessStatus,
  }));

  const handleDeletePress = () => {
    setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
  };

  const handlePlayAgain = () => {
    fetch("/data/words.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n").map((word) => word.trim());
        setCorrectWord(words[Math.floor(Math.random() * words.length)]);
        setCurrentGuess("");
        setGuesses([]);
        setGameOver(false);
        setShowWinModal(false);
      });
  };

  return (
    <div className="wordle-container">
      <h1>WORDLE</h1>
      <button className="rules-button" onClick={handleOpenRules}>
        ?
      </button>
      <WordGrid
        guesses={guesses}
        getGuessStatus={getGuessStatus}
        currentGuess={currentGuess}
      />
      <div data-testid="currentGuess">{currentGuess}</div>
      <div data-testid="guesses">{guesses.join(",")}</div>
      <Keyboard
        onKeyPress={handleKeyPress}
        currentGuess={currentGuess}
        onEnterPress={handleEnterPress}
        onDeletePress={handleDeletePress}
      />
      {showRules && <RulesModal onClose={handleCloseRules} />}
      {showWinModal && <WinModal onClose={handlePlayAgain} />}
    </div>
  );
});

export default Wordle;