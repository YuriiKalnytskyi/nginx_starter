import { StatusCodes } from 'http-status-codes';

const errorCode = {
  // Wrong data. To send the correct data you need to use the documentation.
  validation: 100,


  // The token in the request was not found.
  tokenNotFound: 110,
  // The token in the request is not correct.
  tokenNotValid: 111,
  // Token lifetime expired.
  tokenExpired: 112,


};

const error = {
  validation: (res, error) => {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: error.message.replace(/"/g, ''),
      error: 'Bad request',
      errorCode: errorCode.validation
    });
  },
  tokenNotFound: () => {
    return {
      success: false,
      message: 'To pass the identification, we need a token.',
      error: 'Token not found',
      errorCode: errorCode.tokenNotFound
    };
  },
  tokenNotValid: (res) => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token failed validation.',
      error: 'Unauthorized access',
      errorCode: errorCode.tokenNotValid
    });
  },
  tokenExpired: (res) => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token lifetime expired.',
      error: 'Unauthorized access',
      errorCode: errorCode.tokenExpired
    });
  },
};

export const doom  = {
  errorCode,
  error
};
