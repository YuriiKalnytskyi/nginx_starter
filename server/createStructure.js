// example node createStructure.js app2

import fs  from 'fs'
import path  from 'path'

const currentModuleUrl = new URL(import.meta.url);
const currentModuleDir = path.dirname(currentModuleUrl.pathname);

const dirName = process.argv[2];

if (!dirName) {
  console.error('No name specified. Use it: node createStructure.js <appName>');
  process.exit(1);
}

const basePath = path.join(currentModuleDir, dirName);

fs.mkdirSync(basePath);
fs.writeFileSync(
  path.join(basePath, 'router.js'),
  `
import express from 'express';
const router = express.Router({});
import asyncHandler from 'express-async-handler';


import * as controller  from './controller';
import { validator }  from '../../app/helpers';
import { auth }  from '../../app/middlewares';
import { schemas }  from './validator';

router.get(
    '/',
    asyncHandler(auth.user),
    validator.main(schemas.router.${dirName}.get),
    asyncHandler(controller.${dirName}.get)
);

router.post(
    '/',
    asyncHandler(auth.user),
    validator.main(schemas.router.${dirName}.post),
    asyncHandler(controller.${dirName}.post)
);

router.put(
    '/',
    asyncHandler(auth.user),
    validator.main(schemas.router.${dirName}.put),
    asyncHandler(controller.${dirName}.put)
);

router.delete(
    '/',
    asyncHandler(auth.user),
    validator.main(schemas.router.${dirName}.get),
    asyncHandler(controller.${dirName}.delete)
);

export default router
`
);
fs.writeFileSync(
  path.join(basePath, 'validator.js'),
  `
import Joi from 'joi';

const schemas = {
    router: {
        ${dirName}: {
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

export {
 schemas
}


`
);
fs.writeFileSync(
  path.join(basePath, 'controller.js'),
  `

import { StatusCodes }  from 'http-status-codes';
import { controller } from './../app/helpers';
import * as service  from './service';


const ${dirName} = {
  get: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.${dirName}.get(connection, { ...req.options, ...req.user });
      },
      StatusCodes.OK
    );
  },
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.${dirName}.post(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  },
  put: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.${dirName}.put(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  },
  delete: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.${dirName}.delete(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  }
};

export {
 ${dirName}
}

`
);
fs.writeFileSync(
  path.join(basePath, 'service.js'),
  `
import { doom } from './../app/helpers';

const ${dirName} = {
  get: async (connection, options) => {
    return {
      success: true,
      result: {}
    };
  },
  post: async (connection, options) => {
    return {
      success: true,
      result: {
        message: ''
      }
    };
  },
  put: async (connection, options) => {
    return {
      success: true,
      result: {
        message: ''
      }
    };
  },

  delete: async (connection, options) => {
    return {
      success: true,
      result: {
        message: ''
      }
    };
  }
};

export {
 ${dirName}
}


`
);
