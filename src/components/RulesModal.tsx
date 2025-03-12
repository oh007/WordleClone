import React, { useRef, useEffect } from "react";
import "./RulesModal.css";

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="rules-modal-overlay">
      <div className="rules-modal" ref={modalRef}>
        <h2>How to Play Wordle</h2>
        <p>Guess the hidden 5-letter word in 6 tries.</p>
        <p>Each guess must be a valid 5-letter word.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
        <p><strong>Examples:</strong></p>
        <div className="example-box">
        <div className="example">
          <div className="word-cell correct">W</div>
          <div className="word-cell gray">E</div>
          <div className="word-cell gray">A</div>
          <div className="word-cell gray">R</div>
          <div className="word-cell gray">Y</div>
        </div>
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
        </div>
        <hr /> 
        <div className="example-box">
        <div className="example">
          <div className="word-cell gray">P</div>
          <div className="word-cell yellow">I</div>
          <div className="word-cell gray">L</div>
          <div className="word-cell gray">L</div>
          <div className="word-cell gray">S</div>
        </div>
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        </div>
        <hr /> 
        <div className="example-box">
        <div className="example">
          <div className="word-cell gray">V</div>
          <div className="word-cell gray">A</div>
          <div className="word-cell gray">G</div>
          <div className="word-cell gray">U</div>
          <div className="word-cell gray">E</div>
        </div>
        <p>The letter <strong>V</strong> is not in the word in any spot.</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RulesModal;