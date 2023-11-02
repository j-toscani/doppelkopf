import {
  clubSolo,
  diamondSolo,
  fleischlosOrder,
  hearthSolo,
  spadesSolo,
} from ".";
import { cards } from "../cards";
import { Color, Picture } from "../types";
import { applyOrder, sortCards } from "./utils";

const orderedCards = applyOrder(cards, fleischlosOrder).sort(sortCards);

describe('Fleischlos Order', () => {
  it("Sets correct highest card.", () => {
    const lastCard = orderedCards.at(-1);
    expect(lastCard?.trump).toBe(false);
    expect(lastCard?.picture).toBe(Picture.Ace);
  });

  it("Sets correct lowest card.", () => {
    const firstCard = orderedCards[0];
    expect(firstCard.picture).toBe(Picture.Jack);
    expect(firstCard.trump).toBe(false);
  });

  it("Has correct amount of trump and non trump cards", () => {
    const allTrumpCards = orderedCards.filter(({ trump }) => trump);
    expect(allTrumpCards.length).toBe(0);
  });
});
