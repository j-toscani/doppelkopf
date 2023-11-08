"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Card, GameOrder, OrderedCard } from "@/game/types";
import { dealHands, sortHand } from "@/game/dealHands";
import { OpponentState, opponents } from "@/game/opponent";
import { defaultOrder } from "@/game/orders";
import { applyOrder, sortCards } from "@/game/orders/utils";

type GameContext = {
  canPlayCard: boolean;
  hand: Array<OrderedCard>;
  opponents: Array<OpponentState>;
  table: Array<OrderedCard>;
  playCard: (card: OrderedCard) => void;
};

export const GameContext = createContext<GameContext | null>(null);

export const GameContextProvider: FC<PropsWithChildren<{hand: Array<Card>}>> = ({ children }) => {
  const [order, setOrder] = useState<GameOrder>(defaultOrder);
  const [hand, setHand] = useState<GameContext["hand"]>([]);
  const [table, setTable] = useState<Array<OrderedCard>>([]);

  const playCard = (card: OrderedCard) => {
    setHand(hand.filter((inHand) => inHand.id !== card.id));
    setTable([...table, card]);
  };

  useEffect(() => {
    const orderedCards = applyOrder(hand, order);
    sortHand(orderedCards);
    setHand(orderedCards);
  }, [setHand, order, hand]);

  return (
    <GameContext.Provider
      value={{ hand, table, canPlayCard: true, playCard, opponents }}
    >
      {children}
    </GameContext.Provider>
  );
};
