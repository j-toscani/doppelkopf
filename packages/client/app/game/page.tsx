import Link from "next/link";

export default function GameSelect() {
	return (
		<main className="container mx-auto">
			<h1 className="text-2xl">
				This is the Game Select
			</h1>

			<Link href="/game/lobby">
				To Lobby
			</Link>
		</main>
	);
}
