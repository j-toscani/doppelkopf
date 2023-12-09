import { useGameId } from '@/hooks/useGameId';
import { ParamProps, LobbyParams } from '@/types';
import Link from 'next/link';

export default function Lobby({ params }: ParamProps<LobbyParams>) {
	const { gameId } = useGameId(params)
	return (
		<main className="container mx-auto">
			<h1 className="text-2xl">Lobby</h1>
			<Link href={`/game/${gameId}/play`}>To Game!</Link>
		</main>
	);
}
