import { LoginForm } from '@/components/LoginForm';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Login() {
	if (cookies().get('user')?.value) redirect('/game');

	return (
		<main className="h-full flex">
			<LoginForm>
				<div className="py-2 px-4 flex gap-4">
					<Link href="/game" title="Zur Lobbyauswahl">
						Zur Lobbyauswahl
					</Link>
					<Link href="/register" title="Zum Registrieren">
						Zum Registrieren
					</Link>
				</div>
			</LoginForm>
		</main>
	);
}
