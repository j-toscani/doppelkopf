import {
	BulkWriteOptions,
	Collection,
	DeleteOptions,
	Document,
	Filter,
	FindOptions,
	InsertOneOptions,
	MongoClient,
	OptionalUnlessRequiredId,
	UpdateFilter,
	UpdateOptions,
} from 'mongodb';
import { Game, User } from 'shared';
import { environment } from '../environment';
import { createGame } from './createGame';

const client = new MongoClient(environment.MONGODB_URL, {
	auth: {
		password: environment.DBUSER_PASSWORD,
		username: environment.DBUSER_NAME,
	},
	authSource: environment.MONGODB_DATABASENAME,
}).connect();

const getDb = async () => (await client).db(environment.MONGODB_DATABASENAME);

export class BaseRepository<T extends Document, U = Partial<T>> {
	collection: Promise<Collection<T>>;
	create: (input: U) => T;

	constructor(collection: string, create: (input: U) => T) {
		this.collection = getDb().then((db) => db.collection<T>(collection));
		this.create = create;
	}

	async insertOne(input: OptionalUnlessRequiredId<T>, options?: InsertOneOptions) {
		return (await this.collection).insertOne(input, options);
	}

	async insertMany(input: Array<OptionalUnlessRequiredId<T>>, options?: BulkWriteOptions) {
		return (await this.collection).insertMany(input, options);
	}

	async findOne(query: Filter<T>) {
		return (await this.collection).findOne(query);
	}

	async findMany(query: Filter<T>, options?: FindOptions<T>) {
		return (await this.collection).find(query, options).toArray();
	}

	async updateOne(
		query: Filter<T>,
		update: UpdateFilter<T> | Partial<T>,
		options?: UpdateOptions,
	) {
		return (await this.collection).updateOne(query, update, options);
	}

	async updateMany(query: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions) {
		return (await this.collection).updateMany(query, update, options);
	}

	async deleteOne(query: Filter<T>, options?: DeleteOptions) {
		return (await this.collection).deleteOne(query, options);
	}
}

export const UserRepo = new BaseRepository<User>('users', () => ({ name: '' }));
export const GameRepo = new BaseRepository<Game, { users: Array<User>}>('games', createGame);
