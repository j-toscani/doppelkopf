"use client";
import { FC } from "react";
import { Color, OrderedCard } from "@/client/game/types";
import { german } from "@/client/game/translations";

import Heart from "@/assets/hearts.svg";
import Club from "@/assets/clubs.svg";
import Spade from "@/assets/spades.svg";
import Diamond from "@/assets/diamonds.svg";

import styles from "@/styles/Card.module.scss";

const colorSvgs = {
  [Color.Hearth]: <Heart />,
  [Color.Club]: <Club />,
  [Color.Diamond]: <Diamond />,
  [Color.Spade]: <Spade />,
};

const positions = ["top-4", "bottom-4"].flatMap((v) =>
  ["left-4", "right-4"].map((h) => `absolute ${v} ${h}`)
);

type PropType = {
  card: OrderedCard;
  className?: string;
  draggable?: boolean;
};

export const PlayCard: FC<PropType> = ({ card, className }) => {
  const color = colorSvgs[card.color];
  const picture = german.pictureLetters[card.picture];
  const cardColor = [Color.Diamond, Color.Hearth].includes(card.color)
    ? styles["card--red"]
    : styles["card--black"];

  const cardTitle = `${german.colorNames[card.color]} ${
    german.pictureLabels[card.picture]
  }`;

  return (
    <span
      className={`${className} ${cardColor} ${styles["card--player"]}`}
      title={cardTitle}
      id={card.id}
    >
      {positions.map((position) => (
        <span key={position} className={position}>
          {position.includes("bottom") && (
            <div className={styles["card-picture--letter"]}>{picture}</div>
          )}
          {color}
          {position.includes("top") && (
            <div className={styles["card-picture--letter"]}>{picture}</div>
          )}
        </span>
      ))}
      <div>{color}</div>
    </span>
  );
};
