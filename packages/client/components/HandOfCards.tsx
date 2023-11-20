import { PropsWithChildren, FC } from "react";

const NO_CARDS_PLAYED = 0;
const HALF_CARD_WIDTH_REM = 2

export const HandOfCards: FC<PropsWithChildren<{ maxCards: number, cardsPlayed?: number }>> = ({
  children,
  maxCards,
  cardsPlayed = NO_CARDS_PLAYED,
}) => (
  <div style={{ width: `46rem` }}>
    <ul
      className="grid m-0 tra"
      style={{ gridTemplateColumns: `repeat(${maxCards}, 4rem)`, transform: `translate(${cardsPlayed * HALF_CARD_WIDTH_REM}rem, 0)` }}
    >
      {children}
    </ul>
  </div>
);
