import { firstResult } from 'controllers/result.lib';
import { Context, DefaultState, Next } from 'koa';
import Router from 'koa-router';
// import { headerAuth } from 'middlewares/header-auth';

const resultRouter = new Router<DefaultState, Context>();

// 입맛 유형 API
resultRouter.get('/result', async (ctx, next: Next) => {
  await firstResult(ctx);

  await next();
});

export { resultRouter };
