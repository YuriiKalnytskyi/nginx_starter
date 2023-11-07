import { StatusCodes } from 'http-status-codes';
import db from'../../db/postgres/model/index';

export const sendJson = async (res, action, status = StatusCodes.OK) => {
  let result = await action(db);

  if (db === null) {
    return res.status(StatusCodes.NOT_FOUND).json('No connection to the database.');
  }

  if (result?.success) {
    return res.status(status).json({
      ...result.result
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: result.success,
      message: result.message,
      error: result.error,
      errorCode: result.errorCode
    });
  }
}

export const controller = {
  sendJson
}
