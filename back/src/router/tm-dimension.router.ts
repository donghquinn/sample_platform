import { DefaultState, Next } from 'koa';
import Router from 'koa-router';
import { normalFoodList } from 'libraries/normalfood-list.lib';
import { DefaultCtx } from 'types/request.types';

const normalFoodRouter = new Router<DefaultState, DefaultCtx>();

normalFoodRouter.get('/normal', async (ctx, next: Next) => {
  await normalFoodList(ctx);

  await next();
});

export { normalFoodRouter };
