import { createLogger, format, transports } from "winston";

process.on('unhandledRejection', (reason) => {
    throw new Error(reason);
});

function loginfo() {
    createLogger({
        level: 'info',
        format: format.colorize(),
        transports: [
            new transports.Console()
        ],
        exceptionHandlers: [
            new transports.Console()
        ]
    });
}

export default loginfo;