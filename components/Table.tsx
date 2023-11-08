"use client";

import { DragEventHandler, useRef, useState } from "react";

import styles from "@/styles/Table.module.css";
import { PlayCard } from "./PlayCard";
import { useGame } from "../hooks/useGame";

const onDragEnter: DragEventHandler = (e) => e.preventDefault();
const cardPositionClasses = [
  "area--player",
  "area--left",
  "area--top",
  "area--right",
];

export const Table = () => {
  const { table } = useGame();
  const tableRef = useRef<HTMLUListElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();

    if (table.length >= 4) return;
    e.dataTransfer.dropEffect = "move";

    if (isDraggingOver || !tableRef.current) return;
    tableRef.current.classList.replace("bg-white", "bg-gray-300");
    console.log("replace")
  };
  const onDragEnd: DragEventHandler = (e) => {
    setIsDraggingOver(false);
    if (!tableRef.current || isDraggingOver) return;
    tableRef.current.classList.replace("bg-gray-300", "bg-white");
  };

  return (
    <ul
      className={`${styles.table} bg-white`}
      ref={tableRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragEnd}
      onDrop={onDragEnd}
      onDragOver={onDragOver}
    >
      {table.map((card, index) => (
        <PlayCard
          className={styles[cardPositionClasses[index]]}
          key={card.id}
          card={card}
        />
      ))}
    </ul>
  );
};
