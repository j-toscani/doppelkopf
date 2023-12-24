'use client';
import { FC, PropsWithChildren } from 'react';
import { TextInput } from './TextInput';
import { useFormState } from 'react-dom';
import { createUser } from '@/actions/createUser';

export const RegisterForm: FC<PropsWithChildren> = ({ children }) => {
	const [{ message, success }, action] = useFormState(createUser, { success: false, message: '' });

	return (
		<form className="shadow-md rounded-md p-4 pt-6 m-auto max-w-fit bg-white " action={action}>
			<fieldset className="p-4 flex flex-col gap-2">
				{success === false ?  <TextInput type="text" label="Ihr Benutzername:" id="name" name="name" /> : null}
				{message && <p className="pl-1 my-1 text-sm"> {message}</p>}
				<button title="register">Register</button>
			</fieldset>
			{children}
		</form>
	);
};
