import { jackSoloOrder } from ".";
import { cards } from "../cards";
import { Color, Picture } from "shared/types";
import { applyOrder, sortCards } from "./utils";

const orderedCards = applyOrder(cards, jackSoloOrder).sort(sortCards);

describe('Jack Solo Order', () => {
  it("Sets correct highest card.", () => {
    const lastCard = orderedCards.at(-1);
    expect(lastCard?.trump).toBe(true);
    expect(lastCard?.picture).toBe(Picture.Jack);
    expect(lastCard?.color).toBe(Color.Club);
  });

  it("Sets correct lowest card.", () => {
    const firstCard = orderedCards[0];
    expect(firstCard.picture).toBe(Picture.Queen);
    expect(firstCard.trump).toBe(false);
  });

  it("Has correct amount of trump cards", () => {
    const allTrumpCards = orderedCards.filter(({ trump }) => trump);
    expect(allTrumpCards.length).toBe(8);
    expect(allTrumpCards.every(({ picture }) => picture === Picture.Jack));
  });
});
