const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

export const FIRST_ARRAY_INDEX = 0;
export const NATURAL_ZERO = 0;
export const LAST_ITEM_INDEX = -1;
export const REVERSE_SIGN = -1;

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
	SYSTEM,
};

export const MAX_POINTS = 240;
export const WIN_THRESHOLD_BLACK = 0;
export const WIN_THRESHOLD_30 = 30;
export const WIN_THRESHOLD_60 = 60;
export const WIN_THRESHOLD_90 = 90;
