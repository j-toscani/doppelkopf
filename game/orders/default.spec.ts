import { defaultOrder } from ".";
import { cards } from "../cards";
import { Color, Picture } from "../types";
import { applyOrder, sortCards } from "./utils";

const orderedCards = applyOrder(cards, defaultOrder).sort(sortCards);

describe("Default Order", () => {
  it("Sets correct highest card.", () => {
    const lastCard = orderedCards.at(-1);
    expect(lastCard?.trump).toBe(true);
    expect(lastCard?.picture).toBe(Picture.Ten);
    expect(lastCard?.color).toBe(Color.Hearth);
  });

  // Lowest card needs to be any non trump King, hence no color check
  it("Sets correct lowest card.", () => {
    const firstCard = orderedCards[0];
    expect(firstCard.picture).toBe(Picture.King);
    expect(firstCard.trump).toBe(false);
  });

  it("Has correct amount of trump and non trump cards", () => {
    const allTrumpCards = orderedCards.filter(({ trump }) => trump);
    expect(allTrumpCards.length).toBe(24);
  });
});
