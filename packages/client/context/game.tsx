'use client';

import { createGame } from '@/actions/createGame';
import { getHand } from '@/actions/getHand';
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { opponents } from 'shared/constants';
import { OpponentState, OrderedCard } from 'shared/types';

type GameContext = {
	canPlayCard: boolean;
	hand: Array<OrderedCard>;
	opponents: Array<OpponentState>;
	table: Array<OrderedCard>;
	playCard: (_card: OrderedCard) => void;
};

export const GameContext = createContext<GameContext | null>(null);

export const GameContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const [orderedHand, setOrderedHand] = useState<GameContext['hand']>([]);
	const [table, setTable] = useState<Array<OrderedCard>>([]);

	const playCard = (card: OrderedCard) => {
		setOrderedHand(orderedHand.filter((inHand) => inHand.id !== card.id));
		setTable([...table, card]);
	};

	useEffect(() => {
		try {
			const gameId = sessionStorage.getItem('gameId')
			const id = gameId ? Promise.resolve(gameId) : createGame(['1', '2', '3', '4']);
			id.then((gameId) => {
				sessionStorage.setItem('gameId', gameId)
				getHand(gameId, '1').then(setOrderedHand)
			});
		} catch (error) {
			console.error(error)
		}
	}, []);

	return (
		<GameContext.Provider
			value={{ hand: orderedHand, table, canPlayCard: true, playCard, opponents }}
		>
			{children}
		</GameContext.Provider>
	);
};
