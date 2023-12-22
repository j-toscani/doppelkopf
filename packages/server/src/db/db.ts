import { Database, SQLQueryBindings } from 'bun:sqlite';

export const db = new Database('doppelkopf.sqlite');

export const runOnceAndReturn = <R, P extends SQLQueryBindings | SQLQueryBindings[]>(query: string) => {
    const q = db.query<R,P>(query)
    return (...input: P extends any[] ? P : [P]) => q.get(...input)
}
export const runAllAndReturn = <R, P extends SQLQueryBindings | SQLQueryBindings[]>(query: string) => {
    const q = db.query<R,P>(query)
    return (...input: P extends any[] ? P : [P]) => q.all(...input)
}
export const runAndForget = <R, P extends SQLQueryBindings | SQLQueryBindings[]>(query: string) => {
    const q = db.query<R,P>(query)
    return (...input: P extends any[] ? P : [P]) => q.run(...input)
}

export const createTable = (table: string) => {
	const createTable = db.query(table);

	createTable.run();
	createTable.finalize();
}

