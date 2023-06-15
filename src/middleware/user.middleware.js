const {
  findUserByName,
  findTeacherByName,
  findChargeByClass,
  changeCharge,
  findTeacherByEmployee,
  findStudentByStudentId
} = require('../service/user.service')
const { md5password } = require('../utils/md5-password')
const { publicKey } = require('../config/screct')
const jwt = require('jsonwebtoken')

const verifyStudent = async (ctx, next) => {
  const { name, classes, studentId, password, userId } = ctx.request.body
  // 验证代码
  if (!name || !classes || !studentId || !password || !userId) {
    return ctx.app.emit('error', 'name_or_password_isRequire', ctx)
  }

  // 查看学号是否为十位
  if (studentId.length !== 10) {
    return ctx.app.emit('error', 'studentId_must_equal_ten', ctx)
  }

  // 判断name已存在
  const isName = await findUserByName(studentId, userId)
  if (isName.length) {
    return ctx.app.emit('error', 'studentId_or_userId_have_been', ctx)
  }

  await next()
}

const verifyTeacher = async (ctx, next) => {
  const { name, employee, classes, charge, phone, password } = ctx.request.body
  // 验证代码
  if (!name || !employee || !classes || !charge || !phone || !password) {
    return ctx.app.emit('error', 'name_or_password_isRequire', ctx)
  }

  // 查看职工号是否为三位
  if (employee.length !== 3) {
    return ctx.app.emit('error', 'employee_must_equal_three', ctx)
  }

  // 判断employee, phone已存在
  const isName = await findTeacherByName(employee, phone)
  if (isName.length) {
    return ctx.app.emit('error', 'teacher_employee_phone', ctx)
  }

  // 判断该班级是否已经有班主任
  const isCharge = await findChargeByClass(classes)
  if ((isCharge.length || isCharge?.[0]?.charge === 1) && charge === '1') {
    // 如果有班主任 撤掉原先的班主任
    await changeCharge(classes)
  }

  await next()
}

// 登录
const examineLoginMessage = async (ctx, next) => {
  const { user, password } = ctx.request.body

  // 判断账号密码是否传递
  if (!user || !password) {
    return ctx.app.emit('error', 'name_or_password_isRequire', ctx)
  }
  const md5psw = md5password(password)

  // 判断传递过来的是学号 还是职工号 学号10位, 职工号3位
  if (user.length === 3) {
    // 查找教师数据库
    const res = await findTeacherByEmployee(user)
    if (!res.length) {
      return ctx.app.emit('error', 'user_or_password_isError', ctx)
    }
    // 验证教师密码
    if (md5psw !== res[0].password) {
      return ctx.app.emit('error', 'user_or_password_isError', ctx)
    }
    // 设置教师信息
    ctx.userinfo = res[0]
  } else {
    // 查找学生数据库
    const res = await findStudentByStudentId(user)
    if (!res.length) {
      return ctx.app.emit('error', 'user_or_password_isError', ctx)
    }
    // 验证教师密码
    if (md5psw !== res[0].password) {
      return ctx.app.emit('error', 'user_or_password_isError', ctx)
    }
    // 设置学生信息
    ctx.userinfo = res[0]
  }
  await next()
}

// 是否登录判断
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', 'token_error', ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (error) {
    return ctx.app.emit('error', 'token_error', ctx)
  }
}

module.exports = {
  verifyStudent,
  verifyTeacher,
  examineLoginMessage,
  verifyAuth
}
