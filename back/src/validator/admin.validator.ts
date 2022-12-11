import Joi from 'joi';
import { AdminRegisterBody } from 'types/users/admin/admin.type';

export const adminRequestValidator = Joi.object<AdminRegisterBody>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  isAdmin: Joi.string().required(),
  gender: Joi.string().required(),
  birth: Joi.string().required(),
}).options({ stripUnknown: true });
