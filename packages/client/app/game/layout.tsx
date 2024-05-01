import { logoutUser } from '@/actions/logoutUser';
import { DispatchActionButton } from '@/components/DispatchActionButton';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function GameLayout({ children }: { children: React.ReactNode }) {
	if (!cookies().get('user')?.value) redirect('/');
	return (
		<>
			<header className="container mx-auto flex justify-end py-4">
				<DispatchActionButton action={logoutUser} title="Logout">
					Logout
				</DispatchActionButton>
			</header>
			<div>{children}</div>
		</>
	);
}
