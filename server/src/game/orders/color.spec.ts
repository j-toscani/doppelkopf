import { clubSolo, diamondSolo, hearthSolo, spadesSolo } from ".";
import { cards } from "../cards";
import { Color, Picture } from "shared/types";
import { applyOrder, sortCards } from "./utils";

const orders = {
  [Color.Club]: clubSolo,
  [Color.Diamond]: diamondSolo,
  [Color.Hearth]: hearthSolo,
  [Color.Spade]: spadesSolo,
};

[(Color.Club, Color.Diamond, Color.Hearth, Color.Spade)].forEach((color) => {
  const orderedCards = applyOrder(cards, orders[color]).sort(sortCards);

  describe(`${Color[color]} Color Order`, () => {
    it("Sets correct highest card.", () => {
      const lastCard = orderedCards.at(-1);
      expect(lastCard?.trump).toBe(true);
      expect(lastCard?.picture).toBe(Picture.Ace);
      expect(lastCard?.color).toBe(color);
    });

    it("Sets correct lowest card.", () => {
      const firstCard = orderedCards[0];
      expect(firstCard.picture).toBe(Picture.Jack);
      expect(firstCard.color).not.toBe(color);
      expect(firstCard.trump).toBe(false);
    });

    it("Has correct amount of trump and non trump cards", () => {
      const allTrumpCards = orderedCards.filter(({ trump }) => trump)
      expect(allTrumpCards.length).toBe(10);
      expect(allTrumpCards.every(({ color: cardColor }) => cardColor === color)).toBe(true)
    });
  });
});
