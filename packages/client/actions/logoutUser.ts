'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutUser = (): Promise<void> => {
	cookies().delete('user');
	redirect('/');
};
