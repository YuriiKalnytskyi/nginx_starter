

import { StatusCodes }  from 'http-status-codes';
import { controller } from '../../app/helpers';

import * as service  from './service';


const example = {
  get: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.example.get(connection, { ...req.options, ...req.user });
      },
      StatusCodes.OK
    );
  },
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.example.post(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  },
  put: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.example.put(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  },
  delete: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.example.delete(connection, { ...req.options, ...req.user });
      },
      StatusCodes.CREATED
    );
  }
};

export  {
 example
}

