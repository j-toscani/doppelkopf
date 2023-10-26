import { dealHands } from "@/game/dealHands";
import { PlayField } from "./components/PlayField";

export default function Home() {
  const hands = dealHands()

  return (
    <main className="overflow-hidden">
      <PlayField hands={hands}/>
    </main>
  );
}
