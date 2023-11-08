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

export const GameContextProvider: FC<PropsWithChildren<{hand: Array<Card>}>> = ({ children, hand }) => {
  const [order, setOrder] = useState<GameOrder>(defaultOrder);
  const [orderedHand, setOrderedHand] = useState<GameContext["hand"]>([]);
  const [table, setTable] = useState<Array<OrderedCard>>([]);

  const playCard = (card: OrderedCard) => {
    setOrderedHand(orderedHand.filter((inHand) => inHand.id !== card.id));
    setTable([...table, card]);
  };

  useEffect(() => {
    const orderedCards = applyOrder(hand, order);
    sortHand(orderedCards);
    setOrderedHand(orderedCards);
  }, [setOrderedHand, order, hand]);

  return (
    <GameContext.Provider
      value={{ hand: orderedHand, table, canPlayCard: true, playCard, opponents }}
    >
      {children}
    </GameContext.Provider>
  );
};
