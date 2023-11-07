import  example  from  '../../api/example/router'

export default {
  API: (app) => {
    app.use('/example', example);
  }
}

