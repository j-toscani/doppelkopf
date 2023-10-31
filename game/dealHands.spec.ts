import { dealHands } from "./dealHands";
import { defaultOrder } from "./orders";
import { OrderedCard } from "./types";

let hands: [OrderedCard[], OrderedCard[], OrderedCard[], OrderedCard[]];

describe("Dealing Hands", () => {
  beforeEach(() => {
    hands = dealHands(defaultOrder);
  });

  it("deals the same ammount of cards to everyone", () => {
    const [firstHand] = dealHands(defaultOrder);
    expect(hands.every((h) => h.length === firstHand.length)).toBe(true);
  });

  it("does not deal the same hand twice", () => {
    const round_1 = dealHands(defaultOrder);
    const round_2 = dealHands(defaultOrder);
    round_1.forEach((first, handIndex) => {
      let similarities = 0;

      for (let index = 0; index < first.length; index++) {
        const [firstCard, secondCard] = [first[index], round_2[handIndex][index]];
        similarities += firstCard.id === secondCard.id ? 1 : 0;
      }

      expect(similarities).toBeLessThan(4)
    });
  });
});
