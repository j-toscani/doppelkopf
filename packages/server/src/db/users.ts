import { User, UserParams } from 'shared';
import { createTable, runAllAndReturn, runOnceAndReturn } from './db';

createTable(`CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(36) PRIMARY KEY,
	name VARCHAR(255) UNIQUE
);`)

const getAll = runAllAndReturn<User, null>(`SELECT * from users`)
const createOne = runOnceAndReturn<User, UserParams>(`INSERT INTO users (id, name)
VALUES ($id, $name);`)
const getOneByName = runOnceAndReturn<User, Pick<UserParams, '$name'>>(`SELECT * from users WHERE name = $name`)


export const createUser = (input: Pick<User, 'name'>) => createOne({ $id: crypto.randomUUID(), $name: input.name })
export const getUserByName = (input: Pick<User, 'name'>) => getOneByName({ $name: input.name })
export const getAllUsers = getAll
