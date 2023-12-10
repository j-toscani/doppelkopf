'use client';

import { createGame } from '@/actions/createGame';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

export const CreateGameButton: FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter();
	const createNewGame = () =>
		createGame(['1', '2', '3', '4'])
			.then((gameId) => router.push(`/game/${gameId}`))
			.catch(console.error);
	return (
		<button title="Create New Game" onClick={createNewGame}>
			{children}
		</button>
	);
};
