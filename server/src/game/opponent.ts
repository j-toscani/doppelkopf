import { TablePositions, TablePosition } from "./table";

export type OpponentState = {
  user: string;
  position: TablePosition;
  cardsInHand: number;
};

export const opponents = [
    { user: "1", cardsInHand: 10, position: TablePositions.LEFT },
    { user: "2", cardsInHand: 10, position: TablePositions.TOP },
    { user: "3", cardsInHand: 10, position: TablePositions.RIGHT },
  ];