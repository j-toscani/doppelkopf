"use client"
import { FC } from "react";

import styles from "@/styles/Card.module.scss";
import { HandOfCards } from "./HandOfCards";
import { useGame } from "../hooks/useGame";
import { TablePosition } from "shared/types";
import { FULL_HAND_OF_CARDS_COUNT } from "shared/constants";

export const OpponentHand: FC<{ position: TablePosition }> = ({ position }) => {
  const { opponents } = useGame();
  const cardsInHand = opponents.find(({ position: p }) => position === p)?.cardsInHand ?? FULL_HAND_OF_CARDS_COUNT

  return (
  <HandOfCards maxCards={cardsInHand}>
    {Array.from(new Array(cardsInHand), (e, i) => i).map((card) => (
      <li key={card} className={styles["card--empty"]}>
       <div className={styles['card--empty--pattern']}></div>
      </li>
    ))}
  </HandOfCards>
)};
