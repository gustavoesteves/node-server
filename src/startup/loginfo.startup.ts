import { createLogger, format, transports } from "winston";

process.on('unhandledRejection', (reason) => {
    throw new Error(reason);
});

function loginfo() {
    createLogger({
        level: 'info',
        format: format.colorize(),
        transports: [
            // new transports.File({ filename: 'log/error.log', level: 'error' }),
            // new transports.File({ filename: 'log/combined.log' }),
            new transports.Console()
        ],
        exceptionHandlers: [
            // new transports.File({ filename: 'log/exceptions.log' }),
            new transports.Console()
        ]
    });
}

export default loginfo;