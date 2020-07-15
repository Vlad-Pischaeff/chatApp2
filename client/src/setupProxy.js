const proxy = require('http-proxy-middleware')
const url = 'localhost:5000'

module.exports = function(app) {
  app.use('*',(req, res, next) => {
    console.log('/', req.method, req.params, req.originalUrl, req.path)
    next()
  })
  app.use(proxy('/api', { target: `http://${url}`, changeOrigin: true }))
  app.use(proxy('/ws', { target: `ws://${url}`, ws: true, logLevel: 'debug', changeOrigin: true }));
};