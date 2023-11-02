import { queenSoloOrder } from ".";
import { cards } from "../cards";
import { Color, Picture } from "../types";
import { applyOrder, sortCards } from "./utils";

const orderedCards = applyOrder(cards, queenSoloOrder).sort(sortCards);

describe('Queen Solo Order', () => {
  it("Sets correct highest card.", () => {
    const lastCard = orderedCards.at(-1);
    expect(lastCard?.trump).toBe(true);
    expect(lastCard?.picture).toBe(Picture.Queen);
    expect(lastCard?.color).toBe(Color.Club);
  });

  it("Sets correct lowest card.", () => {
    const firstCard = orderedCards[0];
    expect(firstCard.picture).toBe(Picture.Jack);
    expect(firstCard.trump).toBe(false);
  });

  it("Has correct amount of trump cards", () => {
    const allTrumpCards = orderedCards.filter(({ trump }) => trump);
    expect(allTrumpCards.length).toBe(8);
    expect(allTrumpCards.every(({ picture }) => picture === Picture.Queen));
  });
});
