import Link from "next/link";

export default function Lobby() {
	return (
		<main className="container mx-auto">
			<h1 className="text-2xl">
				Lobby
			</h1>
			<Link href="/game/lobby/1">
				To Game!
			</Link>
		</main>
	);
}
