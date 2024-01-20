'use server';
import { createGame as createGameRequest } from '@/requests';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createGame = async () => {
	const user = cookies().get('user');
	if (!user?.value) redirect('/');
	const {
		game: { id },
	} = await createGameRequest(user.value);
	revalidatePath('/game');
	redirect(`/game/${id}`);
};
