"use client";

import { DragEventHandler, useState } from "react";
import { OrderedCard } from "../game/types";

import styles from "./Table.module.css";
import { PlayCard } from "./PlayCard";

const onDragEnter: DragEventHandler = (e) => e.preventDefault();
const cardPositionClasses = [
  "area--player",
  "area--left",
  "area--top",
  "area--right",
];

export const Table = () => {
  const [dropped, setDropped] = useState<Array<OrderedCard>>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();

    if (dropped.length >= 4) return
    e.dataTransfer.dropEffect = "move";
    
    if (isDraggingOver) return;
    setIsDraggingOver(true);
  };
  const onDragLeave: DragEventHandler = (e) => {
    setIsDraggingOver(false);
  };
  const onDrop: DragEventHandler = (e) => {
    const card = e.dataTransfer.getData("application/doppelkopf");
    setDropped([...dropped, JSON.parse(card)]);
    setIsDraggingOver(false);
  };
  return (
    <ul
      className={styles.table}
      style={{ backgroundColor: isDraggingOver ? "#ddd" : "white" }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {dropped.map((card, index) => (
        <PlayCard
          className={styles[cardPositionClasses[index]]}
          key={card.id}
          card={card}
          onCardMoved={() => {}}
          draggable={false}
        />
      ))}
    </ul>
  );
};
