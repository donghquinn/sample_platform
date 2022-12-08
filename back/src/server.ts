/* eslint-disable @typescript-eslint/restrict-template-expressions */
import helmet from 'koa-helmet';
import Koa from 'koa';
import cors from 'koa-cors';
import json from 'koa-json';
import logger from 'koa-logger';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import { Server } from 'http';
import { routerV1 } from 'router';
import { routerV2 } from 'router/users';
import { Logger } from './utils';

export class KoaServer {
  private port: number;

  private koa: Koa;

  public server: Server | null;

  constructor() {
    this.port = Number(process.env.APP_PORT);

    this.koa = new Koa();

    // start() 이전에는 서버가 실행되지 않음
    this.server = null;
  }

  private attachMiddlewares() {
    // 미들웨어 등록
    this.koa.use(helmet());
    this.koa.use(cors());
    this.koa.use(json());
    this.koa.use(session(this.koa));
    this.koa.use(logger((str) => Logger.info('[MAIN] %o', str)));
    this.koa.use(bodyParser());
    // this.koa.use(headerAuth);
    this.koa.use(routerV1.routes());
    this.koa.use(routerV1.allowedMethods());
    this.koa.use(routerV2.routes());
    this.koa.use(routerV2.allowedMethods());
  }

  // koa 서버 실행
  start() {
    if (!this.server) {
      // 미들웨어 등록
      this.attachMiddlewares();

      // 서버 시작
      this.server = this.koa.listen(this.port, () => {
        const message = `[Koa] Listening on the port ${this.port}`;
        const environment = `[Koa] current NODE_ENV: ${process.env.NODE_ENV}`;
        const wrapCharacter = '@'.repeat(message.length);

        Logger.info(wrapCharacter);
        Logger.info(environment);
        Logger.info(message);
        Logger.info(wrapCharacter);
      });

      return;
    }

    Logger.info('[Koa] Server already started. Ignored');
  }

  stop() {
    if (this.server) {
      const listening = this.server;

      if (listening) {
        this.server.close();

        Logger.info('[Koa] Server closed');
      }
    }
  }
}
