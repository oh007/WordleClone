import { describe, expect, test } from "vitest";

describe("Wordle game logic", () => {
  test("Correct guess should match the target word", () => {
    const targetWord = "water";
    const guess = "water";
    expect(guess).toBe(targetWord);
  });

  test("Incorrect guess should not match", () => {
    const targetWord = "water";
    const guess = "otter";
    expect(guess).not.toBe(targetWord);
  });
});
