import { API_HOST } from '@/constants';

export const createGame = (players: [string, string, string, string]): Promise<string> =>
	fetch(`${API_HOST}/game/new`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ player: players }),
	})
		.then((response) => response.json())
		.then(({ uuid }) => uuid);
