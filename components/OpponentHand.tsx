import { FC } from "react";

import styles from "./Card.module.css";
import { HandOfCards } from "./HandOfCards";

export const OpponentHand: FC<{ cards: number }> = ({ cards }) => (
  <HandOfCards cardCount={cards}>
    {Array.from(new Array(cards), (e, i) => i).map((card) => (
      <li key={card} className={`${styles.card} ${styles["card--empty"]}`}>
       <div className={styles['card--empty--pattern']}></div>
      </li>
    ))}
  </HandOfCards>
);
