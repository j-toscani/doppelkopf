import { germanDeck } from "./cards";
import { PlayCard } from "./components/PlayCard";

export default function Home() {
  return (
    <main className="container mx-auto">
      <ul className="grid grid-cols-5 gap-4">
        {germanDeck.map((card) => (
          <PlayCard key={card.id} card={card} />
        ))}
      </ul>
    </main>
  );
}
