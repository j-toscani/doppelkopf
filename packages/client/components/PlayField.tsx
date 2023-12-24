import { FC } from 'react';
import { PlayerHand } from './PlayerHand';
import { OpponentHand } from './OpponentHand';

import { Table } from './Table';
import { GameContextProvider } from '../context/game';
import styles from '@/styles/Table.module.css';
import { TablePositions } from 'shared';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const PlayField: FC<{ gameId: string }> = ({ gameId }) => {
	const user = cookies().get('user');

	if (!user?.value) redirect('/');

	return (
		<GameContextProvider playerId={user.value} gameId={gameId}>
			<div className="relative flex h-screen">
				<div className={styles['hand--left']}>
					<OpponentHand position={TablePositions.LEFT} />
				</div>
				<div className={styles['hand--top']}>
					<OpponentHand position={TablePositions.TOP} />
				</div>
				<div className={styles['hand--right']}>
					<OpponentHand position={TablePositions.RIGHT} />
				</div>
				<div className={styles['hand--bottom']}>
					<PlayerHand />
				</div>
				<Table />
			</div>
		</GameContextProvider>
	);
};
