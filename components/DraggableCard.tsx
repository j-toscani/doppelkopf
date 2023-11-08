import { FC, PropsWithChildren } from "react";
import { OrderedCard } from "@/game/types";
import { useDraggableCard } from "@/hooks/useDraggableCards";

import styles from "@/styles/Card.module.scss";
import { useGame } from "@/hooks/useGame";

export const DraggableCard: FC<
  PropsWithChildren<{
    card: OrderedCard;
    playCard: (card: OrderedCard) => void;
  }>
> = ({ card, playCard, children }) => {
  const { canPlayCard } = useGame();
  const { onDragEnd, onDragStart, isDragging } = useDraggableCard(
    card,
    playCard
  );

  return (
    <li
      draggable={canPlayCard}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      className={isDragging ? styles["card--is-dragging"] : ""}
    >
      {children}
    </li>
  );
};
