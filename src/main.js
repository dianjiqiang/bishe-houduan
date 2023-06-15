const app = require('./app')
require('./utils/handle-error')

app.listen(LISTEN_PORT, () => {
  console.log('koa服务器启动成功')
})
