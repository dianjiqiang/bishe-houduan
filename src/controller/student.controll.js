const {
  list,
  fill,
  submitScore,
  submit,
  fillNumber,
  queryQue,
  addQueNumber,
  queryStudent,
  queryStudentQue,
  addStudentQue,
  queryNeedQue,
  queryAlreadyQue
} = require('../service/student.service')
const { formatTopic, formatSubmitData } = require('../utils/format-data')
const { screenQue } = require('../utils/screen-data')

class StudentControll {
  async list(ctx, next) {
    // 获取要查询的班级id
    const id = ctx.params.id

    // 获取到对应的数据
    const res = await list(id)

    // 返回
    ctx.body = {
      code: 200,
      message: '查询学生列表信息',
      data: res
    }
  }
  async fill(ctx, next) {
    // 获取到对应的问卷id 和 问卷类型
    const { id } = ctx.query
    // 根据id获取到问卷类型
    const res4 = await queryQue(id)
    const type = String(res4[0].que_type)

    // 通过问卷id获取到对应的问卷信息
    const res = await fill(id, type)

    // 为前端整理数据
    const newRes = formatTopic(res)

    ctx.body = {
      code: 200,
      message: res4[0].name,
      data: newRes
    }
  }
  async submitScore(ctx, next) {
    // 获取学生提交过来的数据
    const body = ctx.request.body

    // 整理前端传递过来的数据
    const newBody = formatSubmitData(body)

    // 将学生传递过来的选项保存到数据库
    const res = await submitScore(newBody)

    // 通过问卷id获取到对应的问卷信息
    const res2 = await fill(newBody.queId, '1')
    // 记录次数
    for (let index = 1; index <= res2.length; index++) {
      const topic = res2[index - 1]
      // 如果是数组 分别记录
      if (Array.isArray(newBody['topic' + index + '_value'])) {
        for (let i = 1; i <= newBody['topic' + index + '_value'].length; i++) {
          // 将次数记录下来
          await fillNumber(
            topic.id,
            newBody['topic' + index + '_value'][i - 1],
            topic[newBody['topic' + index + '_value'][i - 1]] + 1
          )
        }
      } else {
        await fillNumber(topic.id, newBody['topic' + index + '_value'], topic[newBody['topic' + index + '_value']] + 1)
      }
    }
    // 通过问卷id获取到对应的问卷总览信息
    const res3 = await queryQue(newBody.queId)
    let que_student = ''
    if (!res3[0].que_student) {
      que_student = ctx.user.id
    } else {
      que_student = res3[0].que_student + ',' + ctx.user.id
    }
    await addQueNumber(newBody.queId, res3[0].respondents + 1, que_student)

    // 学生填写问卷数量+1
    const res4 = await queryStudentQue(ctx.user.id)
    const newFinish_que = String(Number(res4[0].finish_que) + 1)
    await addStudentQue(ctx.user.id, newFinish_que)

    ctx.body = {
      code: 200,
      message: '用户提交成功',
      data: res
    }
  }
  async submit(ctx, next) {
    // 获取学生提交过来的数据
    const body = ctx.request.body

    // 整理前端传递过来的数据
    const newBody = formatSubmitData(body)

    // 将学生传递过来的id保存到
    const res = await submit(newBody)

    // 通过问卷id获取到对应的问卷信息
    const res2 = await fill(newBody.queId, '2')
    // 记录次数
    for (let index = 1; index <= res2.length; index++) {
      const topic = res2[index - 1]
      // 如果是数组 分别记录
      if (Array.isArray(newBody['topic' + index + '_value'])) {
        for (let i = 1; i <= newBody['topic' + index + '_value'].length; i++) {
          // 将次数记录下来
          await fillNumber(
            topic.id,
            newBody['topic' + index + '_value'][i - 1],
            topic[newBody['topic' + index + '_value'][i - 1]] + 1,
            true
          )
        }
      } else {
        await fillNumber(
          topic.id,
          newBody['topic' + index + '_value'],
          topic[newBody['topic' + index + '_value']] + 1,
          true
        )
      }
    }
    // 通过问卷id获取到对应的问卷总览信息
    const res3 = await queryQue(newBody.queId)
    let que_student = ''
    if (!res3[0].que_student) {
      que_student = ctx.user.id
    } else {
      que_student = res3[0].que_student + ',' + ctx.user.id
    }
    await addQueNumber(newBody.queId, res3[0].respondents + 1, que_student)

    // 学生填写问卷数量+1
    const res4 = await queryStudentQue(ctx.user.id)
    const newFinish_que = String(Number(res4[0].finish_que) + 1)
    await addStudentQue(ctx.user.id, newFinish_que)

    ctx.body = {
      code: 200,
      message: '用户提交成功',
      data: res
    }
  }
  async queList(ctx, next) {
    const { id, class_id } = ctx.user
    // 获取班级所需要填写的问卷
    const res = await queryNeedQue(String(class_id))
    // 获取学生已经填写过的问卷
    const res2 = await queryAlreadyQue(id)
    // 筛选学生需要填写的问卷
    const data = screenQue(res, res2)
    ctx.body = {
      code: 200,
      message: '学生需要填写的问卷列表',
      data
    }
  }
  async alreadyList(ctx, next) {
    const { id } = ctx.params
    // 根据学生学号查找id
    const res2 = await queryStudent(id)
    const stuId = res2[0].id
    // 获取学生已经填写过的问卷
    const res = await queryAlreadyQue(stuId)
    ctx.body = {
      code: 200,
      message: '查看学生已经填写过的问卷',
      data: res
    }
  }
}

module.exports = new StudentControll()
