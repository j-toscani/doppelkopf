import { PropsWithChildren, FC } from "react";

export const HandOfCards: FC<PropsWithChildren<{ maxCards: number, cardsPlayed?: number }>> = ({
  children,
  maxCards,
  cardsPlayed = 0,
}) => (
  <div style={{ width: `46rem` }}>
    <ul
      className="grid m-0 tra"
      style={{ gridTemplateColumns: `repeat(${maxCards}, 4rem)`, transform: `translate(${cardsPlayed * 2}rem, 0)` }}
    >
      {children}
    </ul>
  </div>
);
