import { PlayField } from '@/components/PlayField';
import Link from 'next/link';

export default function Game() {
	return (
		<main className="overflow-hidden">
			<PlayField />
			<Link href="/game" className="absolute top-4 left-4"> ← Zur Lobbyauswahl </Link>
		</main>
	);
}
