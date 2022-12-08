import Joi from 'joi';
import { AdminSignin } from 'types/users/signin.type';

export const signinValidator = Joi.object<AdminSignin>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({ stripUnknown: true });
