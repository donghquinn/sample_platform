import { DefaultContext } from 'koa';
import Router from 'koa-router';
import { DefaultCtx } from 'types/request.types';
import { otherResultRouter } from './other.router';
import { resultRouter } from './result.router';
import { normalFoodRouter } from './tm-dimension.router';

const routerV1 = new Router<DefaultContext, DefaultCtx>({ prefix: '/api' });

routerV1.use(resultRouter.routes());
routerV1.use(otherResultRouter.routes());
routerV1.use(normalFoodRouter.routes());

export { routerV1 };
