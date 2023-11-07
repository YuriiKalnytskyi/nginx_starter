// import { doom } from '../../app/helpers';


const example = {
  get: async (connection, options) => {
    const user = await connection.Users.findAll({})

    return {
      success: true,
      result: {ms: 'ok', users: user}
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

export  {
 example
}


