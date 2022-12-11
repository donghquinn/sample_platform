import Joi from 'joi';
import { AdminRegisterBody, AdminRequestData } from 'types/users/admin/admin.type';

export const adminRequestValidator = Joi.object<AdminRequestData>({
  data: Joi.object<AdminRegisterBody>().required(),
  headers: Joi.object().required(),
}).options({ stripUnknown: true });
