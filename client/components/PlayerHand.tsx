"use client";

import { FC } from "react";
import { PlayCard } from "./PlayCard";
import { HandOfCards } from "./HandOfCards";
import { useGame } from "../hooks/useGame";
import { DraggableCard } from "./DraggableCard";
import { OpponentHand } from "./OpponentHand";
import { EMPTY_HAND_COUNT, FULL_HAND_OF_CARDS_COUNT, TablePositions } from "shared/constants";

export const PlayerHand: FC = () => {
  const { hand, playCard } = useGame();

  return hand.length === EMPTY_HAND_COUNT ? (
    <OpponentHand position={TablePositions.BOTTOM} />
  ) : (
    <HandOfCards maxCards={FULL_HAND_OF_CARDS_COUNT} cardsPlayed={FULL_HAND_OF_CARDS_COUNT - hand.length}>
      {hand.map((card) => (
        <DraggableCard key={card.id} card={card} playCard={playCard}>
          <PlayCard card={card} />
        </DraggableCard>
      ))}
    </HandOfCards>
  );
};
