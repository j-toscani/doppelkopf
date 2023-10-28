import { dealHands } from "../game/dealHands";
import { PlayField } from "../components/PlayField";
import { defaultOrder } from "../game/orders";

export default function Home() {
  const hands = dealHands(defaultOrder)

  return (
    <main className="overflow-hidden">
      <PlayField hands={hands}/>
    </main>
  );
}
