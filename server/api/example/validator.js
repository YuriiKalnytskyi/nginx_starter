
import Joi from 'joi';

const schemas = {
    router: {
        example: {
            all: Joi.object()
                .keys({
                })
                .optional(),
            get: Joi.object()
                .keys({
                })
                .optional(),
            post: Joi.object()
                .keys({
                })
                .optional(),
            put: Joi.object()
                .keys({

                })
                .optional()
        }
    }
};

export  {
 schemas
}


