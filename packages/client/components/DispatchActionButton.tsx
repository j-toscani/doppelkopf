import { FC, PropsWithChildren } from 'react';

export const DispatchActionButton: FC<PropsWithChildren<{ action: () => Promise<unknown>, title: string }>> = ({ children, action, title }) => {
	return (
		<form action={action}>
			<button title={title} type="submit">
				{children}
			</button>
		</form>
	);
};
