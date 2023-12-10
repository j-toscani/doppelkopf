import { FC, PropsWithChildren } from 'react';

type ComponentProps = {
	type: HTMLInputElement['type'];
	label: string;
	id: string;
	required?: boolean;
	name?: string;
	fullWidth?: boolean;
};

export const TextInput: FC<PropsWithChildren<ComponentProps>> = ({ type, label, id, name, fullWidth, required = false }) => (
	<div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
		<label htmlFor={id}>{label}</label>
		<input type={type} id={id} name={name ?? id} required={required} />
	</div>
);
