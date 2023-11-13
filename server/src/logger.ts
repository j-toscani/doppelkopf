/* eslint no-console: 0 */ // --> OFF
import { LOG_LEVEL } from './constants';
const dateFromatter = Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'long' });

class Logger {
	minLevel: number;
	constructor(minLevel: number) {
		this.minLevel = minLevel;
	}

    /**
     * Only for debug Information. Does not show in prod
     * @param message 
     */
	debug(message: string) {
		this.log(LOG_LEVEL.DEBUG, message);
	}

    /**
     * Logs information on incoming requests
     * @param message 
     */
	info(message: string) {
		this.log(LOG_LEVEL.INFO, message);
	}

    /**
     * Logs information on things that could cause problems
     * @param message 
     */
	warn(message: string) {
		this.log(LOG_LEVEL.WARN, message);
	}

    /**
     * Logs information on unexpected behaviour occurs
     * @param message 
     */
	error(message: string) {
		this.log(LOG_LEVEL.ERROR, message);
	}

    /**
     * Logs information on application start up/shut down
     * @param message 
     */
	system(message: string) {
		this.log(LOG_LEVEL.SYSTEM, message);
	}

	log(level: number, message: string) {
		if (level < this.minLevel) return;

		const now = dateFromatter.format(new Date());

		switch (level) {
			case LOG_LEVEL.DEBUG:
				console.debug(`\x1b[34m[DEBUG] ${now}: ${message}\x1b[0m`);
				break;
			case LOG_LEVEL.INFO:
				console.info(`[INFO] ${now}: ${message}`);
				break;
			case LOG_LEVEL.WARN:
				console.warn(`\x1b[33m[WARN] ${now}: ${message}\x1b[0m`);
				break;
			case LOG_LEVEL.ERROR:
				console.error(`\x1b[31m[ERROR] ${now}: ${message}\x1b[0m`);
				break;
			case LOG_LEVEL.SYSTEM:
				console.info(`\x1b[32m[SYSTEM] ${now}: ${message}\x1b[0m`);
				break;

			default:
				break;
		}
	}
}

const LoggerSingleton = new Logger(LOG_LEVEL.DEBUG);

export { LoggerSingleton as Logger };
