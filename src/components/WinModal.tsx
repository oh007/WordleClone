import React from "react";
import "./WinModal.css";

interface WinModalProps {
  onClose: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ onClose }) => {
  return (
    <div className="win-modal-overlay">
      <div className="win-modal">
        <h2>Congratulations, You Won!🎉</h2>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
};

export default WinModal;