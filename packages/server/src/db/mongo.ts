import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27016', {
	auth: {
		password: process.env.MONGODB_PASSWORD || '123',
		username: process.env.MONGODB_USERNAME || 'user',
	},
	authSource: process.env.MONGODB_DATABASE,
}).connect();

export const getCollection = async (collection: string) =>
	(await client).db(process.env.MONGODB_DATABASE).collection(collection);
