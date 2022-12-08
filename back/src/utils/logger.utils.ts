import path from 'path';
import { fileURLToPath } from 'url';
import Winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// 로그 포맷 설정
const { colorize, combine, timestamp: defaultTimestamp, printf, splat, json } = Winston.format;

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const formatted = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

class WinstonLogger {
  private static instance: WinstonLogger;

  private parseLogger: Winston.Logger;

  private logger: Winston.Logger;

  private queryLogger: Winston.Logger;

  private calculateLogger: Winston.Logger;

  private constructor() {
    this.parseLogger = Winston.createLogger({
      format: combine(splat(), json(), defaultTimestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatted),
      transports: [
        new WinstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(dirName, '..', 'logs'),
          filename: '%DATE%.parser.log',
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
    });

    this.queryLogger = Winston.createLogger({
      format: combine(splat(), json(), defaultTimestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatted),
      transports: [
        new WinstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(dirName, '..', 'logs'),
          filename: '%DATE%.query.log',
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
    });

    this.calculateLogger = Winston.createLogger({
      format: combine(splat(), json(), defaultTimestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatted),
      transports: [
        new WinstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(dirName, '..', 'logs'),
          filename: '%DATE%.calculate.log',
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
    });

    this.logger = Winston.createLogger({
      format: combine(splat(), json(), defaultTimestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatted),
      transports: [
        new WinstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(dirName, '..', 'logs'),
          filename: '%DATE%.error.log',
          maxFiles: 100,
          zippedArchive: true,
        }),
        new WinstonDaily({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(dirName, '..', 'logs'),
          filename: '%DATE%.combined.log',
          maxFiles: 100,
          zippedArchive: true,
        }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new Winston.transports.Console({
          format: combine(colorize(), formatted),
        }),
      );
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WinstonLogger();
    }

    return {
      ParseLogger: this.instance.parseLogger,
      Logger: this.instance.logger,
      QueryLogger: this.instance.queryLogger,
      CalculateLogger: this.instance.calculateLogger,
    };
  }
}

const { ParseLogger, Logger, QueryLogger, CalculateLogger } = WinstonLogger.getInstance();

export { ParseLogger, Logger, QueryLogger, CalculateLogger };
