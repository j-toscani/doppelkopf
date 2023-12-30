import { createGame } from '@/actions/createGame';
import { getGames } from '@/actions/getGames';
import { DispatchActionButton } from '@/components/DispatchActionButton';
import Link from 'next/link';

export default async function GameSelect() {
	const { games } = await getGames();
	return (
		<main className="container mx-auto">
			<h1 className="text-2xl">This is the Game Select</h1>
			<div>
				<DispatchActionButton action={createGame} title="Create new game">Create Game</DispatchActionButton>
			</div>
			<ul className="grid grid-cols-6 gap-2">
				{games.map((game) => (
					<li
						className="aspect-video text-center flex flex-wrap justify-center items-center border border-black"
						key={game.id}
					>
						<Link href={`/game/${game.id}`}>To Lobby</Link>
						<span>{game.id}</span>
					</li>
				))}
			</ul>
		</main>
	);
}
