"use client";
import { FC } from "react";
import { Card, Color } from "../../game/types";
import { german } from "../../game/translations";

import Heart from "../assets/hearts.svg";
import Club from "../assets/clubs.svg";
import Spade from "../assets/spades.svg";
import Diamond from "../assets/diamonds.svg";

import styles from "./Card.module.css";
import { useDraggableCard } from "../hooks/useDraggableCards";

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
  card: Card;
  className?: string;
  draggable?: boolean;
  onCardMoved: (id: string) => void;
};

export const PlayCard: FC<PropType> = ({
  card,
  draggable = true,
  onCardMoved,
  className,
}) => {
  const { onDragEnd, onDragStart, isDragging } = useDraggableCard(
    card,
    onCardMoved
  );

  const color = colorSvgs[card.color];
  const picture = german.pictureLetters[card.picture];
  const cardColor = [Color.Diamond, Color.Hearth].includes(card.color)
    ? styles["card--red"]
    : styles["card--black"];

  const cardTitle = `${german.colorNames[card.color]} ${
    german.pictureLabels[card.picture]
  }`;

  return (
    <li
      className={`${className} ${styles.card} ${cardColor} ${
        styles["card--player"]
      } ${draggable ? "cursor-pointer" : ""}   ${
        isDragging ? styles["card--is-dragging"] : ""
      }`}
      title={cardTitle}
      id={card.id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
    </li>
  );
};
