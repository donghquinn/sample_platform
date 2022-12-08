import { firstResult } from 'controllers/result.lib';
import { DefaultState, Next } from 'koa';
import Router from 'koa-router';
// import { headerAuth } from 'middlewares/header-auth';
import { DefaultCtx } from 'types/request.types';

const resultRouter = new Router<DefaultState, DefaultCtx>();

// 입맛 유형 API
resultRouter.get('/result', async (ctx, next: Next) => {
  await firstResult(ctx);

  await next();
});

export { resultRouter };
