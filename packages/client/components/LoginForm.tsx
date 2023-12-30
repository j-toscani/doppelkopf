'use client';
import { FC, PropsWithChildren } from 'react';
import { TextInput } from './TextInput';
import { useFormState } from 'react-dom';
import { loginUser } from '@/actions/loginUser';

export const LoginForm: FC<PropsWithChildren> = ({ children }) => {
	const [{ message }, action] = useFormState(loginUser, {
		success: false,
		message: '',
	});

	return (
		<form className="shadow-md rounded-md p-4 pt-6 m-auto max-w-fit bg-white" action={action}>
			<fieldset className="p-4 flex flex-col gap-2">
				<TextInput type="text" label="Ihr Nutzername:" id="name" name="name" />
				{message && <p className="pl-1 my-1 text-sm"> {message}</p>}
				<button title="Login">Login</button>
			</fieldset>
			{children}
		</form>
	);
};
