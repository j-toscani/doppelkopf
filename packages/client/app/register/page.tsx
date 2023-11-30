import { TextInput } from '@/components/TextInput';
import Link from 'next/link';

export default function Register() {
	return (
		<main className="h-full flex">
			<form className="shadow-md rounded-md p-4 pt-6 m-auto max-w-fit bg-white">
				<fieldset className="p-4">
					<legend className="text-2xl">Register</legend>
					<div className="flex flex-col gap-2 mb-6 w-72">
						<TextInput type="email" label="Ihre E-Mail Adresse:" id="email" />
						<TextInput type="password" label="Passwort:" id="password" />
						<TextInput
							type="password"
							label="Passwort Wiederholen:"
							id="password-repeat"
						/>
					</div>
					<button title="Registrieren">Registrieren</button>
				</fieldset>
				<div className="py-2 px-4 flex gap-4">
					<Link href="/game" title="Zur Lobbyauswahl">
						Zur Lobbyauswahl
					</Link>
					<Link href="/" title="Zum Login">
						Zum Login
					</Link>
				</div>
			</form>
		</main>
	);
}
