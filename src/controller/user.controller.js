const jwt = require('jsonwebtoken')
const { md5password } = require('../utils/md5-password')
const { registerStudent, registerTeacher, findStudentByStudentId, editPassword } = require('../service/user.service')
const { privateKey } = require('../config/screct')
const {
  administrator,
  firstGradeTeacher,
  secondGradeTeacher,
  gradeThreeTeacher,
  student
} = require('../data/menuItemData')

class UserController {
  async registerStudent(ctx, next) {
    // 获取学生信息
    const { name, classes, studentId, password, userId } = ctx.request.body

    // 加密学生密码
    const md5psw = md5password(password)

    // 记录数据库
    const res = await registerStudent(name, classes, studentId, md5psw, userId)

    ctx.body = {
      code: 200,
      message: '注册用户成功',
      data: res
    }
  }
  async registerTeacher(ctx, next) {
    // 获取教师信息
    const { name, employee, classes, charge, phone, password } = ctx.request.body

    // 加密教师密码
    const md5psw = md5password(password)

    // 记录数据库
    const res = await registerTeacher(name, employee, classes, charge, phone, md5psw)

    ctx.body = {
      code: 200,
      message: '注册用户成功',
      data: res
    }
  }
  async loginSystem(ctx, next) {
    // 查看是学生还是教师
    const userinfo = ctx.userinfo
    if (userinfo.studentId) {
      // 学生
      const { id, name, studentId, class_id } = userinfo
      //颁发令牌
      const token = jwt.sign({ id, name, studentId, class_id }, privateKey, {
        expiresIn: 60 * 60 * 24 * 90, //一季度过期
        algorithm: 'RS256'
      })
      // 根据学生班级 返回学生可浏览问卷列表菜单
      let role = 'student'
      let MenuItem = student.MenuItem
      // 返回用户信息
      ctx.body = {
        code: 200,
        data: {
          id,
          name,
          studentId,
          class_id,
          role,
          MenuItem,
          token
        }
      }
    } else {
      const { id, name, employee, class_id, phone, charge } = userinfo
      //颁发令牌
      const token = jwt.sign({ id, name, employee, class_id, phone, charge }, privateKey, {
        expiresIn: 60 * 60 * 24 * 90, //一季度过期
        algorithm: 'RS256'
      })
      // 根据老师管理班级 返回老师对应的权限菜单
      let role = null
      let MenuItem = null
      if (class_id <= 1) {
        role = administrator.role
        MenuItem = administrator.MenuItem
      } else if (class_id <= 7) {
        role = firstGradeTeacher.role
        MenuItem = firstGradeTeacher.MenuItem
      } else if (class_id <= 10) {
        role = secondGradeTeacher.role
        MenuItem = secondGradeTeacher.MenuItem
      } else if (class_id <= 13) {
        role = gradeThreeTeacher.role
        MenuItem = gradeThreeTeacher.MenuItem
      }
      // 返回用户信息
      ctx.body = {
        code: 200,
        data: {
          id,
          name,
          employee,
          class_id,
          phone,
          charge,
          role,
          MenuItem,
          token
        }
      }
    }
  }
  async editPassword(ctx, next) {
    const { studentId, userId, password } = ctx.request.body
    // 根据学号查询对应的学生信息
    const res = await findStudentByStudentId(studentId)
    const studentMessage = res[0]
    if (!studentMessage) {
      return ctx.app.emit('error', 'userId_error_ddd', ctx)
    }
    if (userId !== res[0].userId) {
      return ctx.app.emit('error', 'userId_error_ddd', ctx)
    }
    // 加密学生密码
    const newPassword = md5password(password)

    // 根据学生学号修改新密码
    const res2 = await editPassword(studentId, newPassword)
    ctx.body = {
      code: 200,
      message: '修改密码成功',
      body: res2
    }
  }
}

module.exports = new UserController()
