//wordle-tests
import React from "react";
import '@testing-library/jest-dom';
import Wordle from "./Wordle";

import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("canvas-confetti", () => jest.fn());
global.Audio = jest.fn().mockImplementation(() => {
    return {
        play: jest.fn(),
        pause: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        currentTime: 0,
    };
});

window.alert = jest.fn();

describe("Wordle Component Tests", () => {

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve("apple\nbanana\ncherry"),
            })
        ) as jest.Mock;
    });

  

    test("displays correct colors for guess letters", () => {
        render(<Wordle wordList={["apple"]} />);
        
        fireEvent.click(screen.getByRole("button", { name: "a" }));
        fireEvent.click(screen.getByRole("button", { name: "p" }));
        fireEvent.click(screen.getByRole("button", { name: "p" }));
        fireEvent.click(screen.getByRole("button", { name: "l" }));
        fireEvent.click(screen.getByRole("button", { name: "e" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));

        const guessTiles = screen.getAllByTestId("guess-tile");
        expect(guessTiles[0]).toHaveClass("correct");
        expect(guessTiles[1]).toHaveClass("correct");
        expect(guessTiles[2]).toHaveClass("correct");
        expect(guessTiles[3]).toHaveClass("correct");
        expect(guessTiles[4]).toHaveClass("correct");
    });

    test("displays yellow color for correct letter in wrong position", () => {
        render(<Wordle wordList={["apple"]} />);
        
        fireEvent.click(screen.getByRole("button", { name: "p" }));
        fireEvent.click(screen.getByRole("button", { name: "a" }));
        fireEvent.click(screen.getByRole("button", { name: "p" }));
        fireEvent.click(screen.getByRole("button", { name: "l" }));
        fireEvent.click(screen.getByRole("button", { name: "e" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));

        const guessTiles = screen.getAllByTestId("guess-tile");
        expect(guessTiles[0]).toHaveClass("yellow");
        expect(guessTiles[1]).toHaveClass("yellow");
        expect(guessTiles[2]).toHaveClass("correct");
        expect(guessTiles[3]).toHaveClass("correct");
        expect(guessTiles[4]).toHaveClass("correct");
    });

    test("displays gray color for incorrect letters", () => {
        render(<Wordle wordList={["apple"]} />);
        
        fireEvent.click(screen.getByRole("button", { name: "w" }));
        fireEvent.click(screen.getByRole("button", { name: "r" }));
        fireEvent.click(screen.getByRole("button", { name: "o" }));
        fireEvent.click(screen.getByRole("button", { name: "n" }));
        fireEvent.click(screen.getByRole("button", { name: "g" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));

        const guessTiles = screen.getAllByTestId("guess-tile");
        guessTiles.forEach(tile => {
            expect(tile).toHaveClass("gray");
        });
    });
});