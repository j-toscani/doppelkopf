import { db } from './db';

type User = {
	id: string;
	name: string;
};

type UserParams = {
	$id: string;
	$name: string;
};

export const createUserTable = () => {
	const createTable = db.query(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    );`);

	createTable.run();
	createTable.finalize();
}

const getUsersQuery = db.query<User, null>(`SELECT * from users`);
const createUserQuery = db.query<User, UserParams>(`INSERT INTO users (id, name)
VALUES ($id, $name);`);
const getUserByNameQuery = db.query<User, Pick<UserParams, '$name'>>(
	`SELECT * from users WHERE name = $name`,
);

export const getUsers = (): Array<User> => getUsersQuery.all(null);
export const createUser = (input: { name: string }): void =>
	createUserQuery.run({ $id: crypto.randomUUID(), $name: input.name });
export const getUser = (input: { name: string }): User | null =>
	getUserByNameQuery.get({ $name: input.name });
