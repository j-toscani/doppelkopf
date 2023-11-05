import { DragEventHandler, useState } from "react";
import { Card } from "../../game/types";

export const useDraggableCard = (
  card: Card,
  onCardMoved: (id: string) => void
) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart: DragEventHandler = (e) => {
    e.dataTransfer.setData("application/doppelkopf", JSON.stringify(card));
    setIsDragging(true);
  };
  const onDragEnd: DragEventHandler = (e) => {
    if (e.dataTransfer.dropEffect === "move") {
      onCardMoved(card.id);
    }
    setIsDragging(false);
  };

  return {
    onDragEnd,
    onDragStart,
    isDragging,
  }
};
