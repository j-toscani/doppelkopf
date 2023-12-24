
"use server"
import { API_HOST } from '@/constants';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const createGameAction = (players: [string, string, string, string]): Promise<string> =>
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

export const createGame = async () => {
	const user = cookies().get('user')
	if(!user?.value) redirect('/')
	const game = await createGameAction([user.value,'2', '3', '4'])
	revalidatePath('/game')
	redirect(`/game/${game}`)
} 