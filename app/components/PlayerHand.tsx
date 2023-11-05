"use client"

import { FC, useState } from "react";
import { Card } from "../../game/types";
import { PlayCard } from "./PlayCard";
import { HandOfCards } from "./HandOfCards";

export const PlayerHand: FC<{ cards: Array<Card> }> = ({ cards }) => {
  const [played, setPlayed] = useState<Array<string>>([])
  const onCardMoved = (id: string) => {
    setPlayed([...played, id])
  }

  return (
  <HandOfCards maxCards={cards.length} cardsPlayed={played.length}>
    {cards.filter((card) => !played.includes(card.id)).map((card) => (
      <PlayCard key={card.id} card={card} onCardMoved={onCardMoved} />
    ))}
  </HandOfCards>
)};
