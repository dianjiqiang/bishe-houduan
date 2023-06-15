const KoaRouter = require('@koa/router')
const { verifyStudent, verifyTeacher, examineLoginMessage, verifyAuth } = require('../middleware/user.middleware')
const { registerStudent, registerTeacher, loginSystem, editPassword, upload } = require('../controller/user.controller')


const userRouter = new KoaRouter({ prefix: '/user' })

userRouter.post('/register/student', verifyStudent, registerStudent)
userRouter.post('/register/teacher', verifyTeacher, registerTeacher)
// 登录接口
userRouter.post('/login', examineLoginMessage, loginSystem)
// 测试登录接口
userRouter.get('/test', verifyAuth)

// 修改密码
userRouter.post('/edit/password', editPassword)


module.exports = userRouter
