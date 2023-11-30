import { API_HOST } from '@/constants';
import { OrderedCard } from 'shared';

export const getHand = (gameId: string, playerId: string): Promise<Array<OrderedCard>> =>
	fetch(`${API_HOST}/games/${gameId}/hand?player=${playerId}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}

			throw new Error(response.status.toString());
		})
		.then(({ hand }) => hand);
