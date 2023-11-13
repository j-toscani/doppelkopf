import { cards } from "./cards";

describe("Deck of Cards", () => {
  it("has the correct ammount of cards", () => {
    expect(cards.length).toBe(40);
  });
  it("contains every card twice", () => {
    const ids: Record<string, number> = {};

    for (let index = 0; index < cards.length; index++) {
      const { picture, color } = cards[index];
      const id = `${picture}${color}`;
      ids[id] = id in ids ? (ids[id] += 1) : 1;
    }

    expect(Object.values(ids).every((v) => v === 2)).toBe(true);
  });
});
