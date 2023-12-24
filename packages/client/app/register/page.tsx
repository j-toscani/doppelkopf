import { RegisterForm } from '@/components/RegisterForm';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Register() {
	if (cookies().get('user')?.value) redirect('/game');

	return (
		<main className="h-full flex">
			<RegisterForm>
				<div className="py-2 px-4 flex gap-4">
					<Link href="/game" title="Zur Lobbyauswahl">
						Choose a Lobby
					</Link>
					<Link href="/" title="Zum Login">
						To Login
					</Link>
				</div>
			</RegisterForm>
		</main>
	);
}
