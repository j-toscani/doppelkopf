import { FC } from "react";
import { Card } from "../../game/types";
import { german } from "../../game/translations";

import styles from "./Card.module.css";

const positions = ["top-4", "bottom-4"].flatMap((v) =>
  ["left-4", "right-4"].map((h) => `absolute ${v} ${h}`)
);

export const PlayCard: FC<{ card: Card }> = ({ card }) => {
  const color = german.colors[card.color];
  const picture = german.pictures[card.picture];
  return (
    <li className={`${styles.card} ${styles["card--player"]}`}>
      {positions.map((position) => (
        <span key={position} className={position}>
          {color} <br /> <small>{picture}</small>
        </span>
      ))}
      <div>
        <span>{picture}</span> {": "}
        <span>{card.points}</span>
      </div>
    </li>
  );
};
