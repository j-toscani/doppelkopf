import { FC, PropsWithChildren } from "react";
import { OrderedCard } from "@/client/game/types";
import { useDraggableCard } from "@/client/hooks/useDraggableCards";

import styles from "@/styles/Card.module.scss";
import { useGame } from "@/client/hooks/useGame";

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
