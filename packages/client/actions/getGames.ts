import { API_HOST } from '@/constants';
import { Game } from 'shared';

export const getGames = (): Promise<{ games: Array<Game> }> =>
	fetch(`${API_HOST}/games`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Could not fetch games.');
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
			return [];
		});
