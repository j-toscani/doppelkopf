import { cards } from "../game/cards";
import { PlayerHand } from "./components/PlayerHand";
import { PlayCard } from "./components/PlayCard";
import { dealHands } from "@/game/dealHands";

export default function Home() {
  const hands = dealHands()

  return (
    <main className="container mx-auto">
      <PlayerHand cards={hands[0]} />
      <ul className="grid grid-cols-5 gap-4">
        {cards.map((card) => (
          <PlayCard key={card.id} card={card} />
        ))}
      </ul>
    </main>
  );
}
