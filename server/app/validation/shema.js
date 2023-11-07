import Joi  from 'joi' ;

export const validateSchema = {
  name: Joi.string().trim().required().max(13),
  text: Joi.string().trim().required(),
  password: Joi.string().trim().required().min(8),
  email: Joi.string().trim().email().required(),
  phone: Joi.alternatives(Joi.string().trim(), Joi.number()).required(),
  id: Joi.alternatives(Joi.string().trim(), Joi.number()).required(),
  number: Joi.number().required(),
  numberOptions: Joi.number().optional(),
  textOptions: Joi.string().allow('').optional(),
  company_info: Joi.object({
    id: Joi.alternatives(Joi.string().trim(), Joi.number()).required(),
    name: Joi.string().required()
  }).required(),

  company_info_optional: Joi.any().optional(),
  location: Joi.array().min(1).items(Joi.string()).required(),
  boolean: Joi.boolean().required()
};

export const commonInformation = {
  email: validateSchema.email,
  first_name: validateSchema.name,
  last_name: validateSchema.name,
  phone: validateSchema.phone
};


