import { PlayField } from '@/components/PlayField';
import Link from 'next/link';
import { LobbyParams, ParamProps } from '@/types';
import { useGameId } from '@/hooks/useGameId';

export default function Game({ params }: ParamProps<LobbyParams>) {
	const { gameId } = useGameId(params);
	return (
		<main className="overflow-hidden">
			<PlayField gameId={gameId} />
			<Link href="/game" className="absolute top-4 left-4">
				← To lobby select
			</Link>
		</main>
	);
}
