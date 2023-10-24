import { FC } from "react";
import { TranslatedCard } from "../cards/types";

export const PlayCard: FC<{ card: TranslatedCard }> = ({ card }) => (
  <li className="relative w-60 h-96 flex justify-center items-center p-4 border-white border rounded-md">
    <span className="absolute top-4 left-4"> {card.color} </span>
    <span className="absolute top-4 right-4"> {card.color} </span>
    <span className="absolute bottom-4 left-4"> {card.color} </span>
    <span className="absolute bottom-4 right-4"> {card.color} </span>

    <div>
      <span>{card.picture}</span> {': '}
      <span>{card.points}</span>
    </div>
  </li>
);
