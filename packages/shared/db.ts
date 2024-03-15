import { OrderedCard, Table } from './game';

export type Handler<Dependencies, Parameters, Result> = (
	d: Dependencies,
) => (p: Parameters) => Result;

export type User = {
	name: string;
};

export type Game = {
	id: string;
	hands: Array<Array<OrderedCard>>;
	table: Table;
	rounds: Array<Table>;
	seats: Array<User | null>;
	activeSeat: number;
};
