import { ErrorHandler } from 'elysia';
import { API_RESPONSE_CODE } from './constants';
import { Logger } from './logger';

export abstract class ApiError extends Error {
	statusCode: number;

	constructor(name: string, statusCode: number, message: string) {
		super();
		this.name = name;
		this.message = message;
		this.statusCode = statusCode;
	}

	format() {
		return `[${this.statusCode} - ${this.name}]: ${this.message}`;
	}
}

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super('BadRequest', API_RESPONSE_CODE.BAD_REQUEST, message);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super('Unauthorized', API_RESPONSE_CODE.UNAUTHORIZED, message);
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super('NotFound', API_RESPONSE_CODE.NOT_FOUND, message);
	}
}

export class InternalServerError extends ApiError {
	constructor(message: string) {
		super('InternalServerError', API_RESPONSE_CODE.INTERNAL_SERVER_ERROR, message);
	}
}

export const handleError: ErrorHandler = ({ error: _error }) => {
	Logger.error(_error.message);
	const error =
		_error instanceof ApiError
			? _error
			: new BadRequestError('Server was not able to handle this request.');

	return new Response(error.message, {
		status: error.statusCode,
		statusText: error.message,
	});
}