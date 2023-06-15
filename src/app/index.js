const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { LISTEN_PORT } = require('../config/server.js')
const registerRouter = require('../router')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-control-allow-headers", "Authorization,Accept,Accept-Encoding,Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent")
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 204
  }
  await next()
})

app.use(bodyParser())

registerRouter(app)

module.exports = app
