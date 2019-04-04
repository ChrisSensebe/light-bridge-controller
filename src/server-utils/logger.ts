import * as winston from 'winston';
import {format} from 'winston';
import {config} from '../config';

const logLevel = config.logLevel || 'info';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(log => `${log.timestamp} ${log.level}: ${log.message}${log.splat !== undefined ? `${log.splat}` : ' '}`)
      )
    })
  ],
  exitOnError: false
});

export default logger;

