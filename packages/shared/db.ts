export  type Handler<Depencies, Parameters, Result> = (d: Depencies) => (p: Parameters) => Result

export type User = {
	id: string;
	name: string;
};

export type UserParams = {
	$id: string;
	$name: string;
};