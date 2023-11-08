
import express from 'express';
const router = express.Router({});
import asyncHandler from 'express-async-handler';

import * as controller  from './controller';
import { validator  }  from '../../app/helpers';
import { schemas }  from './validator';

router.get(
    '/',
    // asyncHandler(auth.user),
    validator.main(schemas.router.example.get),
    asyncHandler(controller.example.get)
);

router.post(
    '/',
    // asyncHandler(auth.user),
    validator.main(schemas.router.example.post),
    asyncHandler(controller.example.post)
);

router.put(
    '/',
    // asyncHandler(auth.user),
    validator.main(schemas.router.example.put),
    asyncHandler(controller.example.put)
);

router.delete(
    '/',
    // asyncHandler(auth.user),
    validator.main(schemas.router.example.get),
    asyncHandler(controller.example.delete)
);


export default router
