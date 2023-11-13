import { FC } from "react";
import { PlayerHand } from "./PlayerHand";
import { OpponentHand } from "./OpponentHand";

import { Table } from "./Table";
import { GameContextProvider } from "../context/game";
import styles from "@/styles/Table.module.css";
import { TablePositions } from "../game/table";
import { dealHands } from "../game/dealHands";

export const PlayField: FC = () => {
  const [playerHand] = dealHands();

  return (
    <GameContextProvider hand={playerHand}>
      <div className="relative flex h-screen">
        <div className={styles["hand--left"]}>
          <OpponentHand position={TablePositions.LEFT} />
        </div>
        <div className={styles["hand--top"]}>
          <OpponentHand position={TablePositions.TOP} />
        </div>
        <div className={styles["hand--right"]}>
          <OpponentHand position={TablePositions.RIGHT} />
        </div>
        <div className={styles["hand--bottom"]}>
          <PlayerHand />
        </div>
        <Table />
      </div>
    </GameContextProvider>
  );
};
