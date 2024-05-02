import { OrderedCard, Table } from './game';

export type Handler<Dependencies, Parameters, Result> = (
	d: Dependencies,
) => (p: Parameters) => Result;

export type User = {
	name: string;
};

export type Seat = {
	user: User | null,
	isRe: boolean,
	hand: Array<OrderedCard>
}

export type Game = {
	id: string;
	rounds: Array<Table>;
	seats: Array<Seat>;
	activeSeat: number;
};
