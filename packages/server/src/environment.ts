const DEFAULT_PORT = 4000;

const PORT = process.env.PORT ?? DEFAULT_PORT;
const MONGODB_URL = process.env.MONGOBD_URL ?? 'mongodb://127.0.0.1:27017';
const DBUSER_PASSWORD = process.env.MONGODB_PASSWORD || '123';
const DBUSER_NAME = process.env.MONGODB_USERNAME ?? 'user';
const MONGODB_DATABASENAME = process.env.MONGODB_DATABASE;

const RP_NAME = process.env.RP_NAME ?? 'Doppelkopf';
const RP_ID = process.env.RP_ID ?? 'doppelkopf.dev';
const RP_ORIGIN = `http://${process.env.RP_ORIGIN ?? 'localhost'}:${PORT}`;
const ORIGIN = process.env.DEVELOPMENT ? '*' : RP_ORIGIN;

export const environment = {
	PORT,
	ORIGIN,
	MONGODB_URL,
	DBUSER_PASSWORD,
	DBUSER_NAME,
	MONGODB_DATABASENAME,
	RP_NAME,
	RP_ID,
	RP_ORIGIN,
};
