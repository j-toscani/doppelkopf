import { germanDeck } from "./cards";

export default function Home() {
  return (
    <main className="container mx-auto">
      <ul>
        {germanDeck.map(({ color, picture, id, points }) => (
          <li key={id}>
            {color}: {picture} = {points}
          </li>
        ))}
      </ul>
    </main>
  );
}
