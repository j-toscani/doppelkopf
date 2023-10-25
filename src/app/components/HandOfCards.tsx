import { PropsWithChildren, FC } from "react";

export const HandOfCards: FC<PropsWithChildren<{ cardCount: number }>> = ({
  children,
  cardCount,
}) => (
  <div style={{ width: `51rem` }}>
    <ul
      className="grid m-0"
      style={{ gridTemplateColumns: `repeat(${cardCount}, 4rem)` }}
    >
      {children}
    </ul>
  </div>
);
