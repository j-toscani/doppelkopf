import { FC } from "react";
import { Card } from "../../game/types";
import { PlayCard } from "./PlayCard";
import { HandOfCards } from "./HandOfCards";

export const PlayerHand: FC<{ cards: Array<Card> }> = ({ cards }) => (
  <HandOfCards cardCount={cards.length}>
    {cards.map((card) => (
      <PlayCard key={card.id} card={card} />
    ))}
  </HandOfCards>
);
