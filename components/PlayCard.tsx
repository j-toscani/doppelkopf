"use client";
import { FC } from "react";
import { Card, Color } from "../game/types";
import { german } from "../game/translations";

import styles from "./Card.module.css";
const positions = ["top-4", "bottom-4"].flatMap((v) =>
  ["left-4", "right-4"].map((h) => `absolute ${v} ${h}`)
);

export const PlayCard: FC<{ card: Card }> = ({ card }) => {
  const color = german.colorSvgs[card.color];
  const picture = german.pictureLetters[card.picture];
  const cardColor = [Color.Diamond, Color.Hearth].includes(card.color)
    ? styles["card--red"]
    : styles["card--black"];

    const cardTitle = `${german.colorNames[card.color]} ${german.pictureLabels[card.picture]}`
  return (
    <li className={`${styles.card} ${styles["card--player"]} ${cardColor}`} title={cardTitle}>
      {positions.map((position) => (
        <span key={position} className={position}>
          {color}
          <div className={styles["card-picture--letter"]}>{picture}</div>
        </span>
      ))}
      <div>{color}</div>
    </li>
  );
};
