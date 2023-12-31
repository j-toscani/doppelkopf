'use server';
import { createUser as createUserRequest } from "@/requests";

export const createUser = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string; success: boolean }> => {
	const name = formData.get('name') ?? '';
	if (typeof name !== 'string') throw Error('Property has wrong type');

	try {
		await createUserRequest(name);
		return {
			message: 'User wurde angelegt',
			success: true,
		};
	} catch (error) {
		return {
			message: 'User konnte nicht angelegt werden.',
			success: false,
		};
	}
};
