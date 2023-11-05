import { OrderedCard } from "../../game/types";
import { FC } from "react";
import { PlayerHand } from "./PlayerHand";
import { OpponentHand } from "./OpponentHand";

import { Table } from "./Table";

export const PlayField: FC<{
  hands: [
    Array<OrderedCard>,
    Array<OrderedCard>,
    Array<OrderedCard>,
    Array<OrderedCard>
  ];
}> = ({ hands: [a, b, c, d] }) => (
  <div className="relative flex h-screen">
    <div className="absolute -translate-x-1/2 -translate-y-1/2 rotate-180 left-1/2 top-0 flex items-center">
      <OpponentHand cards={10} />
    </div>
    <div className="absolute translate-x-1/2 -translate-y-1/2 -rotate-90 right-0 top-1/2 flex items-center">
      <OpponentHand cards={10} />
    </div>
    <div className="absolute -translate-x-1/2 -translate-y-1/2 rotate-90 left-0 top-1/2 flex items-center">
      <OpponentHand cards={10} />
    </div>
    <div className="absolute -translate-x-1/2 translate-y-1/4 left-1/2 bottom-0 flex items-center">
      <PlayerHand cards={a} />
    </div>
    <Table />
  </div>
);
