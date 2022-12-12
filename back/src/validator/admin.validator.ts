import Joi from 'joi';
import { AdminRegisterBody, AdminRegisterCtx } from 'types/users/admin/admin.type';

export const adminRequestValidator = Joi.object<AdminRegisterCtx>({
  data: Joi.object<AdminRegisterBody>().required(),
  // headers: Joi.object().required(),
}).options({ stripUnknown: true });
