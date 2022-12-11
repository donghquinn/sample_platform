import Joi from 'joi';
import { AdminSigninCtx } from 'types/users/admin/admin.type';
import { SigninRequest } from 'types/users/signin.type';

export const signinValidator = Joi.object<AdminSigninCtx>({
  data: Joi.object<SigninRequest>().required(),
}).options({ stripUnknown: true });
