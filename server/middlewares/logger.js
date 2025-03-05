import winston from 'winston';
const { transports, format, createLogger } = winston;
const { combine, printf } = format;

//Date for for the format:
import moment from 'moment/moment.js';
const currentDate = moment();
const dateIs = currentDate.format('MMMM Do YYYY, h:mm:ss a');

const customLog = printf(({ level, message }) => {
	return `Level:[${level}] LogTime: [${dateIs}] Message:-[${message}]`;
});

//coupleUser logs:
export const coupleUserInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/coupleUser',
			level: 'info',
		}),
	],
});

export const coupleUserErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/coupleUser',
			level: 'error',
		}),
	],
});

//attractions logs:
export const attractionsInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/attractions',
			level: 'info',
		}),
	],
});

export const attractionsErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/attractions',
			level: 'error',
		}),
	],
});

//dates logs:
export const datesInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/dates',
			level: 'info',
		}),
	],
});

export const datesErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/dates',
			level: 'error',
		}),
	],
});

//natureLocations logs:
export const natureLocationsInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/natureLocations',
			level: 'info',
		}),
	],
});

export const natureLocationsErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/natureLocations',
			level: 'error',
		}),
	],
});

//reviews logs:
export const reviewsInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/reviews',
			level: 'info',
		}),
	],
});

export const reviewsErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/reviews',
			level: 'error',
		}),
	],
});

//trips logs:
export const tripsInfoLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'Info.log',
			dirname: 'logs/trips',
			level: 'info',
		}),
	],
});

export const tripsErrorLogger = createLogger({
	format: combine(customLog),
	transports: [
		new transports.File({
			filename: 'errors.log',
			dirname: 'logs/trips',
			level: 'error',
		}),
	],
});
