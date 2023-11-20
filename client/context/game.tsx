"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { Card, GameOrder, OrderedCard } from "shared/types";
import { OpponentState, opponents } from "../game/opponent";

type GameContext = {
  canPlayCard: boolean;
  hand: Array<OrderedCard>;
  opponents: Array<OpponentState>;
  table: Array<OrderedCard>;
  playCard: (_card: OrderedCard) => void;
};

export const GameContext = createContext<GameContext | null>(null);

export const GameContextProvider: FC<PropsWithChildren<{hand: Array<Card>}>> = ({ children, hand }) => {
  const [order, _setOrder] = useState<GameOrder>(defaultOrder);
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
