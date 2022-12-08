import { normalFoodList } from 'controllers/normalfood-list.lib';
import { DefaultState, Next } from 'koa';
import Router from 'koa-router';

import { DefaultCtx } from 'types/request.types';

const normalFoodRouter = new Router<DefaultState, DefaultCtx>();

normalFoodRouter.get('/normal', async (ctx, next: Next) => {
  await normalFoodList(ctx);

  await next();
});

export { normalFoodRouter };
