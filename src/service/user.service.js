const connection = require('../app/database')

class UserService {
  // 注册学生
  async registerStudent(name, classes, studentId, password, userId) {
    const statement = 'INSERT INTO `students` (`name`, `class_id`, studentId, password,userId) values (?, ?,?,?,?);'
    const [res] = await connection.execute(statement, [name, classes, studentId, password, userId])

    return res
  }
  // 查看学生身份证 或者 学号是否重复
  async findUserByName(studentId, userId) {
    const statement = 'SELECT * FROM `students` WHERE studentId = ? OR userId = ?;'
    const [res] = await connection.execute(statement, [studentId, userId])

    return res
  }
  // 查看教师 职工号 或者 电话号码是否重复
  async findTeacherByName(employee, phone) {
    const statement = 'SELECT * FROM `teachers` WHERE employee = ? OR phone = ?;'
    const [res] = await connection.execute(statement, [employee, phone])

    return res
  }
  // 查看通过班级号查看班主任姓名
  async findChargeByClass(classes) {
    const statement = 'SELECT charge FROM `teachers` WHERE class_id = ?;'
    const [res] = await connection.execute(statement, [classes])

    return res
  }
  // 通过班级号 替换掉原先班级的班主任
  async changeCharge(classes) {
    const statement = 'UPDATE `teachers` SET `charge` = 0 WHERE class_id = ?;'
    const [res] = await connection.execute(statement, [classes])

    return res
  }
  // 注册教师
  async registerTeacher(name, employee, classes, charge, phone, password) {
    const statement =
      'INSERT INTO `teachers` (`name`, `employee`, class_id, charge,phone, password) values (?, ?,?,?,?, ?);'
    const [res] = await connection.execute(statement, [name, employee, classes, charge, phone, password])

    return res
  }
  // 查找对应职工号的教师
  async findTeacherByEmployee(employee) {
    const statement = 'SELECT * FROM `teachers` WHERE employee = ?;'
    const [res] = await connection.execute(statement, [employee])

    return res
  }
  // 查找对应学号的学生
  async findStudentByStudentId(studentId) {
    const statement = 'SELECT * FROM `students` WHERE studentId = ?;'
    const [res] = await connection.execute(statement, [studentId])

    return res
  }
  // 修改学生密码
  async editPassword(studentId, password) {
    const statement = 'UPDATE students SET password = ? WHERE studentId = ?;'
    const [res] = await connection.execute(statement, [password, studentId])

    return res
  }
}

module.exports = new UserService()
