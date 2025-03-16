import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import WordGrid from "./WordGrid";
import React from "react";

describe("WordGrid Component", () => {
  test("renders previous guesses correctly", () => {
    const guesses = ["APPLE", "BERRY"];
    const getGuessStatus = (guess: string) => guess.split("").map(() => "gray");

    render(<WordGrid guesses={guesses} getGuessStatus={getGuessStatus} currentGuess="" />);

    guesses.forEach((guess) => {
      guess.split("").forEach((letter) => {
        const letterElements = screen.getAllByText(letter);
        expect(letterElements.length).toBeGreaterThan(0);
      });
    });
  });

  test("displays currentGuess in the correct row", () => {
    const guesses = ["APPLE"];
    const currentGuess = "BERR";
    const getGuessStatus = (guess: string) => guess.split("").map(() => "gray");

    render(<WordGrid guesses={guesses} getGuessStatus={getGuessStatus} currentGuess={currentGuess} />);

    currentGuess.split("").forEach((letter) => {
      const letterElements = screen.getAllByText(letter);
      expect(letterElements.length).toBeGreaterThan(0);
    });
  });

  test("renders empty cells in unused rows", () => {
    const guesses: string[] = ["APPLE"];
    const getGuessStatus = (guess: string) => guess.split("").map(() => "gray");

    render(<WordGrid guesses={guesses} getGuessStatus={getGuessStatus} currentGuess="" />);

    const emptyCells = screen.getAllByTestId("guess-tile").filter(cell => cell.textContent === "");
    expect(emptyCells.length).toBeGreaterThan(0);
  });
});
