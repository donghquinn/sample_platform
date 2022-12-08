import { DefaultState } from 'koa';
import Router from 'koa-router';
import { DefaultCtx } from 'types/request.types';
import { adminRouter } from './admin/admin-router.router';

const routerV2 = new Router<DefaultState, DefaultCtx>();

routerV2.use(adminRouter.routes());

export { routerV2 };
