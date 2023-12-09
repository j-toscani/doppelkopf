import Link from "next/link";

export default function Lobby() {
	return (
		<main className="container mx-auto">
			<h1 className="text-2xl">
				Lobby
			</h1>
			<Link href="/game/1/play">
				To Game!
			</Link>
		</main>
	);
}
