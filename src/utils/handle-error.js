const app = require('../app')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case 'name_or_password_isRequire':
      code = -1001
      message = '您有信息未填写'
      ctx.body = {
        code,
        message
      }
      return
    case 'studentId_or_userId_have_been':
      code = -1002
      message = '学号或身份证已存在'
      ctx.body = {
        code,
        message
      }
      return
    case 'teacher_employee_phone':
      code = -1003
      message = '您输入的职工号或电话重复'
      ctx.body = {
        code,
        message
      }
      return
    case 'employee_must_equal_three':
      code = -1004
      message = '教师职工号必须为三位'
      ctx.body = {
        code,
        message
      }
      return
    case 'studentId_must_equal_ten':
      code = -1005
      message = '学生学号必须为十位'
      ctx.body = {
        code,
        message
      }
      return
    case 'user_or_password_isError':
      code = -1006
      message = '您输入的账号或密码有误'
      ctx.body = {
        code,
        message
      }
      return
    case 'token_error':
      code = -1007
      message = 'token已过期或不存在'
      ctx.body = {
        code,
        message
      }
      return
    case 'not_self':
      code = -1008
      message = '您只能操作自己的问卷'
      ctx.body = {
        code,
        message
      }
      return
    case 'userId_error_ddd':
      code = -1009
      message = '您的学号或身份证输入错误'
      ctx.body = {
        code,
        message
      }
      return
  }
})
