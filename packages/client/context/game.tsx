'use client';

import { getHand } from '@/actions/getHand';
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { opponents } from 'shared/constants';
import { OpponentState, OrderedCard } from 'shared';

type GameContext = {
	canPlayCard: boolean;
	hand: Array<OrderedCard>;
	opponents: Array<OpponentState>;
	table: Array<OrderedCard>;
	playCard: (_card: OrderedCard) => void;
};

export const GameContext = createContext<GameContext | null>(null);

export const GameContextProvider: FC<PropsWithChildren<{ gameId: string, playerId: string }>> = ({
	children,
	gameId,
	playerId
}) => {
	const [orderedHand, setOrderedHand] = useState<GameContext['hand']>([]);
	const [table, setTable] = useState<Array<OrderedCard>>([]);

	const playCard = (card: OrderedCard) => {
		setOrderedHand(orderedHand.filter((inHand) => inHand.id !== card.id));
		setTable([...table, card]);
	};

	useEffect(() => {
		getHand(gameId, playerId).then(setOrderedHand).catch(console.error);
	}, [gameId, playerId]);

	return (
		<GameContext.Provider
			value={{ hand: orderedHand, table, canPlayCard: true, playCard, opponents }}
		>
			{children}
		</GameContext.Provider>
	);
};
