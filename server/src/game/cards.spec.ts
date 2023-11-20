import { FULL_DECK_OF_CARDS_COUNT } from "shared/constants";
import { describe, it, expect } from "bun:test";
import { cards } from "./cards";

const MINIMAL_COPIES_COUNT = 1
const EXPECTED_COPIES_COUNT = 2

describe("Deck of Cards", () => {
  it("has the correct ammount of cards", () => {
    expect(cards.length).toBe(FULL_DECK_OF_CARDS_COUNT);
  });
  it("contains every card twice", () => {
    const ids: Record<string, number> = {};

    for (let index = 0; index < cards.length; index++) {
      const { picture, color } = cards[index];
      const id = `${picture}${color}`;
      ids[id] = id in ids ? (ids[id] += 1) : MINIMAL_COPIES_COUNT;
    }

    expect(Object.values(ids).every((v) => v === EXPECTED_COPIES_COUNT)).toBe(true);
  });
});
