const { queryQue } = require('../service/teacher.service')

const verifySelf = async (ctx, next) => {
  const { employee } = ctx.user
  const { id } = ctx.params
  if (employee === '101') {
    const res = await queryQue(id, employee)
    ctx.deleteQue = res[0]
    await next()
  } else {
    //查询数据库 是否是本人
    const res = await queryQue(id, employee)
    if (!res.length) {
      return ctx.app.emit('error', 'not_self', ctx)
    }
    ctx.deleteQue = res[0]
    await next()
  }
}

module.exports = {
  verifySelf
}
