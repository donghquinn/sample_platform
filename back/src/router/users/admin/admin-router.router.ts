import { adminController } from 'controllers/users/admin/create.lib';
import { searchTotalUsers } from 'controllers/users/admin/search.lib';
import { signinController } from 'controllers/users/signin.lib';
import { DefaultState, Next } from 'koa';
import Router from 'koa-router';
import { AdminCtx } from 'types/users/admin/admin.type';

const adminRouter = new Router<DefaultState, AdminCtx>();

adminRouter.post('/register', async (ctx, next: Next) => {
  await adminController(ctx);

  await next();
});

adminRouter.post('/signin', async (ctx, next: Next) => {
  await signinController(ctx);

  await next();
});

adminRouter.get('/count', async (ctx, next: Next) => {
  await searchTotalUsers(ctx);

  await next();
});

export { adminRouter };
