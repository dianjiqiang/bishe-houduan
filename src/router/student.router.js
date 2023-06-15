const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/user.middleware')
const { list, fill, submitScore, submit, queList, alreadyList } = require('../controller/student.controll')

const studentRouter = new KoaRouter({ prefix: '/student' })

studentRouter.get('/list/:id', verifyAuth, list)

// 填写问卷
studentRouter.get('/que/fill', verifyAuth, fill)

// 提交分数类型问卷
studentRouter.post('/que/submit/score', verifyAuth, submitScore)
studentRouter.post('/que/submit', verifyAuth, submit)

// 拉取学生需要填写的问卷
studentRouter.get('/que/list', verifyAuth, queList)

// 拉取学生已经填写的问卷列表
studentRouter.get('/que/already/list/:id', verifyAuth, alreadyList)

module.exports = studentRouter
