import Joi from 'joi';
import { AdminRegisterCtx } from 'types/users/admin/admin.type';

export const adminRequestValidator = Joi.object<AdminRegisterCtx>({
  data: Joi.string().required(),
  // headers: Joi.object().required(),
}).options({ stripUnknown: true });
