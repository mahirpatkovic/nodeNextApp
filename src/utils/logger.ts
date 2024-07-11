import { createLogger, format, transports, addColors } from 'winston';

const { combine, colorize, label, timestamp, printf } = format;

const customFormat = combine(
    colorize({ all: true }),
    label({ label: '[LOGGER]' }),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    printf(
        (info) =>
            `${info.level} : ${info.message} {"timestamp": "${info.timestamp}"}`,
    ),
);

addColors({
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    debug: 'green',
});

const logger = createLogger({
    level: 'debug',
    transports: [new transports.Console({ format: customFormat })],
});

export const log = {
    info: (message: string) => logger.info(message),
    warn: (message: string) => logger.warn(message),
    error: (message: string) => logger.error(message),
    debug: (message: string) => logger.debug(message),
};
