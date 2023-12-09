import { API_HOST } from '@/constants';

export const createGame = (players: [string, string, string, string]): Promise<{ uuid: string }> =>
	fetch(`${API_HOST}/games/new`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ player: players }),
	})
		.then((response) => {
			if (!response.ok) throw new Error('Game was not created.');
			return response.json();
		})
		.then(({ id }) => id);
