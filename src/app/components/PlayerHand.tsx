import { FC } from "react";
import { Card } from "../../game/types";
import { PlayCard } from "./PlayCard";

export const PlayerHand: FC<{ cards: Array<Card> }> = ({ cards }) => (
  <div className="container flex place-content-center">
    <ul
      className="my-6 grid -translate-x-1/4"
      style={{ gridTemplateColumns: `repeat(${cards.length}, 4rem)` }}
    >
      {cards.map((card) => (
        <PlayCard key={card.id} card={card} />
      ))}
    </ul>
  </div>
);
