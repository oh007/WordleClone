import React, { useState, useEffect } from "react";
import "./Keyboard.css";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  currentGuess: string;
  onEnterPress: () => void;
  onDeletePress: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onEnterPress,
  onDeletePress,
}) => {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["←", "z", "x", "c", "v", "b", "n", "m", "↵"],
  ];
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const renderKeyContent = (key: string) => {
    return key;
  };
  useEffect(() => {
    const newAudio = new Audio("/keypress.wav"); 
    setAudio(newAudio);
  }, []);

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`keyboard-key ${
                key === "↵" ? "enter" : key === "←" ? "delete" : ""
              }`} 
              onClick={() => {
                playSound();
                if (key === "↵") {
                  onEnterPress();
                } else if (key === "←") {
                  onDeletePress();
                } else {
                  onKeyPress(key);
                }
              }}
            >
              {renderKeyContent(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;