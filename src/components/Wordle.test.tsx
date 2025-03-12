import { render, screen, fireEvent } from "@testing-library/react";
import Wordle from "./Wordle";
import { vi } from "vitest";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));
global.Audio = vi.fn().mockImplementation(() => {
    return {
        play: vi.fn(),
        pause: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        currentTime: 0,
    };
});

describe("Wordle Component Tests", () => {
    const testWordList = ["tests", "apple", "wrong"];

    test("updates current guess when a key is pressed", () => {
        render(<Wordle wordList={testWordList} />);
        fireEvent.click(screen.getByRole("button", { name: "a" }));
        expect(screen.getByTestId("currentGuess").textContent).toBe("a");
    });

    test("adds a guess to the guesses array when Enter is pressed", () => {
        render(<Wordle wordList={testWordList} />);
        fireEvent.click(screen.getByRole("button", { name: "a" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));
        expect(screen.getByTestId("guesses").textContent).toContain("a");
    });

    test("shows the win modal when the correct word is guessed", async () => {
        render(<Wordle wordList={testWordList} />);

        fireEvent.click(screen.getByRole("button", { name: "t" }));
        fireEvent.click(screen.getByRole("button", { name: "e" }));
        fireEvent.click(screen.getByRole("button", { name: "s" }));
        fireEvent.click(screen.getByRole("button", { name: "t" }));
        fireEvent.click(screen.getByRole("button", { name: "s" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));

        expect(screen.getByText("Congratulations, You Won!")).toBeInTheDocument();
    });

    test("does not show the win modal when an incorrect word is guessed", () => {
        render(<Wordle wordList={testWordList} />);

        fireEvent.click(screen.getByRole("button", { name: "w" }));
        fireEvent.click(screen.getByRole("button", { name: "r" }));
        fireEvent.click(screen.getByRole("button", { name: "o" }));
        fireEvent.click(screen.getByRole("button", { name: "n" }));
        fireEvent.click(screen.getByRole("button", { name: "g" }));
        fireEvent.click(screen.getByRole("button", { name: "↵" }));

        expect(screen.queryByText("Congratulations, You Won!")).toBeNull();
    });
});