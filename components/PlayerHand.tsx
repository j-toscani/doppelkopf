"use client";

import { FC } from "react";
import { PlayCard } from "./PlayCard";
import { HandOfCards } from "./HandOfCards";
import { useGame } from "@/hooks/useGame";
import { DraggableCard } from "./DraggableCard";
import { OpponentHand } from "./OpponentHand";
import { TablePosition } from "@/game/table";

export const PlayerHand: FC = () => {
  const { hand, playCard } = useGame();

  return hand.length === 0 ? (
    <OpponentHand position={TablePosition.BOTTOM} />
  ) : (
    <HandOfCards maxCards={10} cardsPlayed={10 - hand.length}>
      {hand.map((card) => (
        <DraggableCard key={card.id} card={card} playCard={playCard}>
          <PlayCard card={card} />
        </DraggableCard>
      ))}
    </HandOfCards>
  );
};
