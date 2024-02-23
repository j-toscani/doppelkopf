export type Handler<Depencies, Parameters, Result> = (d: Depencies) => (p: Parameters) => Result;

export type User = {
	name: string;
};
