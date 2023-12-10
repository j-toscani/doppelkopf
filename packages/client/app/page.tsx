import { TextInput } from '@/components/TextInput';
import Link from 'next/link';

export default function Login() {
	return (
		<main className="h-full flex">
			<form className="shadow-md rounded-md p-4 pt-6 m-auto max-w-fit bg-white">
				<fieldset className="p-4">
					<legend className="text-2xl">Login</legend>
					<div className="flex flex-col gap-2 mb-6 w-72">
						<TextInput type="email" label="Ihre E-Mail Adresse:" id="email" />
						<TextInput type="password" label="Passwort:" id="password" />
					</div>
					<button title="Einloggen">Einloggen</button>
				</fieldset>
				<div className="py-2 px-4 flex gap-4">
					<Link href="/game" title="Zur Lobbyauswahl">
						Zur Lobbyauswahl
					</Link>
					<Link href="/register" title="Zum Registrieren">
						Zum Registrieren
					</Link>
				</div>
			</form>
		</main>
	);
}
