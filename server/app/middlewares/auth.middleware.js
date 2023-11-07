import JWT from 'jsonwebtoken';
import path from'path';
import dotenv from 'dotenv';


import { doom } from '../helpers';

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `./.env.${env}`) });

const auth = () => {
  return async (req, res, next) => {
    let bearerToken = req.headers.authorization;

    if (bearerToken === undefined) {

      return res.json(doom.error.tokenNotFound(res))
    }


    let token = bearerToken.split(' ');

    if (Array.isArray(token) && token.length === 2) {
      token = token[1];
    } else {
      return doom.error.tokenNotValid(res);
    }
    let decode;
    try {
      decode = JWT.verify(token, process.env.ACCESS_TOKEN);
    } catch (e) {
      if (e.name === JWT.TokenExpiredError.name) {
        return doom.error.tokenExpired(res);
      } else {
        return doom.error.tokenNotValid(res);
      }
    }
    req.user = {};
    req.user.id = decode.sub;
    next();
  };
};

const verifyIsToken = async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(' ');

  if (Array.isArray(token) && token.length === 2 && token[1] !== 'null' && token[1] !== null) {
    let decoded;

    try {
      decoded = JWT.verify(token[1], process.env.ACCESS_TOKEN);
    } catch (e) {
      return doom.error.tokenNotValid(res);
    }

    req.user = {};
    req.user.id = decoded.sub;
    next();
  } else {
    next();
  }
};

const admin = async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken === undefined) {
    return doom.error.tokenNotFound(res);
  }

  let token = bearerToken.split(' ');
  if (Array.isArray(token) && token.length === 2) {
    token = token[1];
  } else {
    return doom.error.tokenNotValid(res);
  }

  let decoded = JWT.verify(token, process.env.ACCESS_TOKEN);

  if (decoded.type !== 'admin' && decoded.type !== 'super_admin') {
    return doom.error.adminRights(res);
  }
  req.user = {};
  req.user.id = decoded.sub;
  next();
};

const superAdmin = async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken === undefined) {
    return doom.error.tokenNotFound(res);
  }

  let token = bearerToken.split(' ');
  if (Array.isArray(token) && token.length === 2) {
    token = token[1];
  } else {
    return doom.error.tokenNotValid(res);
  }

  let decoded = JWT.verify(token, process.env.ACCESS_TOKEN);

  if (decoded.type !== 'super_admin') {
    return doom.error.adminRights(res);
  }
  req.user = {};
  req.user.id = decoded.sub;
  next();
};

export default {
  user: auth(),
  admin,
  verifyIsToken,
  superAdmin
}
