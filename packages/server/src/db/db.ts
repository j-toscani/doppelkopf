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
import { User } from 'shared';

const client = new MongoClient(process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27016', {
	auth: {
		password: process.env.MONGODB_PASSWORD || '123',
		username: process.env.MONGODB_USERNAME || 'user',
	},
	authSource: process.env.MONGODB_DATABASE,
}).connect();

const getDb = async () => (await client).db(process.env.MONGODB_DATABASE);

export class BaseRepository<T extends Document> {
	collection: Promise<Collection<T>>;

	constructor(collection: string) {
		this.collection = getDb().then((db) => db.collection<T>(collection));
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
		return (await this.collection).find(query, options);
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

export const UserRepo = new BaseRepository<User>('users');
