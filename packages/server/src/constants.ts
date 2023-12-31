const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

export const FIRST_ARRAY_INDEX = 0;
export const LAST_ITEM_INDEX = -1;


export const API_RESPONSE_CODE = {
	BAD_REQUEST,
	UNAUTHORIZED,
	NOT_FOUND,
	INTERNAL_SERVER_ERROR,
};

const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;
const SYSTEM = 4;

export const LOG_LEVEL = {
	DEBUG,
	INFO,
	WARN,
	ERROR,
    SYSTEM
};
