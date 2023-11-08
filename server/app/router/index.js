import  example  from  '../../api/example/router'

export default {
  API: (app) => {
    app.use('/api/example', example);
  }
}
