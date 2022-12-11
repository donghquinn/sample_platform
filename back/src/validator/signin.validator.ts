import Joi from 'joi';
import { AdminSigninCtx } from 'types/users/admin/admin.type';

export const signinValidator = Joi.object<AdminSigninCtx>({
  data: Joi.string().required(),
}).options({ stripUnknown: true });
