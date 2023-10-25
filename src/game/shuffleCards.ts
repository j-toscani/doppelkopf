import { Card } from "./types";

export const shuffleCards = (cards: Array<Card>): Array<Card> => {
    const shuffled: Array<Card> = [];
    const copy = [...cards];
    while (copy.length) {
      const randomIndex = Math.floor(copy.length * Math.random());
      const [card] = copy.splice(randomIndex, 1);
      shuffled.push(card);
    }
  
    return shuffled;
  };