import { DefaultState, Next } from 'koa';
import Router from 'koa-router';
import { otherResult } from 'libraries';
import { DefaultCtx } from 'types/request.types';

const otherResultRouter = new Router<DefaultState, DefaultCtx>();

// 입맛 외 요소 라우터
otherResultRouter.get('/other', async (ctx, next: Next) => {
  await otherResult(ctx);

  await next();
});

export { otherResultRouter };
