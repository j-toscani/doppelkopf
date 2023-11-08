import { FC } from "react";
import { PlayerHand } from "./PlayerHand";
import { OpponentHand } from "./OpponentHand";

import { Table } from "./Table";
import { GameContextProvider } from "@/context/game";
import styles from '@/styles/Table.module.css'
import { TablePosition } from "@/game/table";

export const PlayField: FC = () => (
  <GameContextProvider>
    <div className="relative flex h-screen">
      <div className={styles['hand--left']}>
        <OpponentHand position={TablePosition.LEFT} />
      </div>
      <div className={styles['hand--top']}>
        <OpponentHand position={TablePosition.TOP}/>
      </div>
      <div className={styles['hand--right']}>
        <OpponentHand position={TablePosition.RIGHT} />
      </div>
      <div className={styles['hand--bottom']}>
        <PlayerHand />
      </div>
      <Table />
    </div>
  </GameContextProvider>
);
