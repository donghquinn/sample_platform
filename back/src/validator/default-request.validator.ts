import Joi from 'joi';
import { AuthByKeyCtx } from 'types/request.types';

export const defaultRequestValidator = Joi.object<AuthByKeyCtx>({
  clientid: Joi.string().required(),
}).options({ stripUnknown: true });
