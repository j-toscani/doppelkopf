import { FC } from "react";
import { Card } from "../../game/types";
import { german } from "../../game/translations";


  export const PlayCard: FC<{ card: Card }> = ({ card }) => {
    const color = german.colors[card.color];
    const picture = german.pictures[card.picture];
    return (
      <li className="relative w-60 h-96 flex justify-center items-center p-4 bg-white text-black border-black border rounded-md">
        <span className="absolute top-4 left-4"> {color} <br /> <small>{picture}</small> </span>
        <span className="absolute top-4 right-4"> {color} <br /> <small>{picture}</small> </span>
        <span className="absolute bottom-4 left-4"> {color} <br /> <small>{picture}</small> </span>
        <span className="absolute bottom-4 right-4"> {color} <br /> <small>{picture}</small> </span>

        <div>
          <span>{picture}</span> {": "}
          <span>{card.points}</span>
        </div>
      </li>
    );
  };