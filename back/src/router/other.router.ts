import { Context, DefaultState, Next } from 'koa';
import Router from 'koa-router';
import { otherResult } from 'libraries';

const otherResultRouter = new Router<DefaultState, Context>();

// 입맛 외 요소 라우터
otherResultRouter.get('/other', async (ctx, next: Next) => {
  await otherResult(ctx);

  await next();
});

export { otherResultRouter };
