'use client';

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

const API_HOST = 'http://localhost:4000';
export const GameContext = createContext<GameContext | null>(null);

export const GameContextProvider: FC<PropsWithChildren<{ gameId: string }>> = ({
	children,
	gameId,
}) => {
	const [orderedHand, setOrderedHand] = useState<GameContext['hand']>([]);
	const [table, setTable] = useState<Array<OrderedCard>>([]);

	const playCard = (card: OrderedCard) => {
		setOrderedHand(orderedHand.filter((inHand) => inHand.id !== card.id));
		setTable([...table, card]);
	};

	useEffect(() => {
		const gameIdPromise = gameId
			? Promise.resolve(gameId)
			: fetch(`${API_HOST}/game/new`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
			  }).then((response) => response.json());

		gameIdPromise.then((id) => {
			fetch(`${API_HOST}/game/${id}/id?player=1`, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((hand) => setOrderedHand(hand))
				.catch(console.error);
		});
	});

	return (
		<GameContext.Provider
			value={{ hand: orderedHand, table, canPlayCard: true, playCard, opponents }}
		>
			{children}
		</GameContext.Provider>
	);
};
