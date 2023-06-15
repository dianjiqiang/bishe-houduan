const { formatTopicTeacher, formatTopic, formatQueTopIc, formatTopicAddCount, formatTreeSelect } = require('../utils/format-data')
const {
  list,
  queList,
  queryCharge,
  queryNeedQue,
  insertQueTitle,
  insertTopic,
  queryTeacherQue,
  addTeacherQue,
  deleteTopic,
  deleteQue,
  queryQue,
  queryStudentTopic,
  queryTopic,
  queryStudentAvg,
  queryStarQue,
  starQue,
  cancelStarQue,
  queryTeacherStarQue,
  reduceStudentCounter,
  queryTeacherQueAuthor,
  teacherNameList,
  queryTeacherMessage
} = require('../service/teacher.service')

class TeacherControll {
  async list(ctx, next) {
    // 获取要查询的班级id
    const id = ctx.params.id

    // 获取到对应的数据
    const res = await list(id)

    // 返回
    ctx.body = {
      code: 200,
      message: '查询教师列表信息',
      data: res
    }
  }
  async queList(ctx, next) {
    // 获取到教师id
    const id = ctx.params.id

    // 获取到对应的数据
    const res = await queList(id)

    ctx.body = {
      code: 200,
      message: '查询到id为' + id + '教师发布的问卷',
      data: res
    }
  }
  async queryCharge(ctx, next) {
    // 获取要查找的班级
    const id = ctx.params.id

    const res = await queryCharge(id)

    ctx.body = {
      code: 200,
      message: '查找班级班主任',
      data: res
    }
  }
  async queryNeedQue(ctx, next) {
    // 获取需要查询的班级问卷
    const class_id = ctx.params.id

    const res = await queryNeedQue(class_id)
    ctx.body = {
      code: 200,
      message: '查找班级需要填写的问卷数量',
      data: res
    }
  }
  async issue(ctx, next) {
    // 获取问卷类型
    const type = ctx.params.type

    // 获取前端传递过来的数据
    const body = ctx.request.body

    // 判断是班级还是教师
    if (body.teacherId >=6 ) {
      // 需要添加的是教师 获取教师信息
      const teacherMessage = await queryTeacherMessage(body.teacherId)
      const { id, name, employee, class_id } = teacherMessage[0]
      // 保存问卷标题
      const { title } = body
      const newTitle = name+'老师的'+title
      const res = await insertQueTitle(newTitle, name, class_id, type, employee)
      const { insertId } = res

      // 获取问卷题目
      const { topic } = body

      // 整理问卷题目
      const newTopic = formatTopicTeacher(topic, insertId)

      // 记录问卷题目
      await insertTopic(type, newTopic)

      // 查询该教师发布的问卷
      const res3 = await queryTeacherQue(id)
      const newNumber = String(Number(res3[0].publish) + 1)

      // 发布问卷次数 + 1
      await addTeacherQue(employee, newNumber)
    }else{
      // 如果选择的是班级 查询班级教师
      const teacherMessage = await queryTeacherMessage(body.teacherId)
      for(let i = 0; i< teacherMessage.length; i++){
        const { id, name, employee, class_id } = teacherMessage[i]

        // 保存问卷标题和类型
        const { title } = body
        const newTitle = name+'老师的'+title
        const res = await insertQueTitle(newTitle, name, class_id, type, employee)
        const { insertId } = res

        // 获取问卷题目
        const { topic } = body

        // 整理问卷题目
        const newTopic = formatTopicTeacher(topic, insertId)

        // 记录问卷题目
        await insertTopic(type, newTopic)

        // 查询该教师发布的问卷
        const res3 = await queryTeacherQue(id)
        const newNumber = String(Number(res3[0].publish) + 1)

        // 发布问卷次数 + 1
        await addTeacherQue(employee, newNumber)
      }
    }
    ctx.body = {
      code: 200,
      message: '添加问卷题目成功!',
      data: []
    }
  }
  async deleteQue(ctx, next) {
    // 取出问卷id 和 问卷类型
    const { id, que_type, author_number } = ctx.deleteQue
    // 删除问卷id对应的题目
    await deleteTopic(id, que_type)
    // 对应教师发布问卷次数 - 1
    const res3 = await queryTeacherQueAuthor(author_number)
    let newNumber = res3[0].publish - 1
    newNumber = newNumber === -1 ? 0 : newNumber
    await addTeacherQue(author_number, newNumber)
    // 写过该问卷的学生次数-1
    const res5 = await queryQue(id, '101')
    const studentArray = res5[0]?.que_student?.split(',')
    if (studentArray !== undefined || studentArray?.length) {
      // 写过该问卷的学生次数-1
      for (let i = 0; i < studentArray.length; i++) {
        await reduceStudentCounter(studentArray[i])
      }
    }
    // 删除对应问卷
    const res = await deleteQue(id)
    ctx.body = {
      code: 200,
      message: '删除问卷成功',
      data: res
    }
  }
  async studentTopic(ctx, next) {
    const { queId, studentId } = ctx.query
    // 根据对应的学生id 查询对应的问卷 类型
    const res = await queryQue(queId, '101')
    const { que_type, name } = res[0]
    // 根据学生id和问卷id查询学生对应的填写情况
    const res2 = await queryStudentTopic(queId, studentId, que_type)
    // 根据问卷id查询对应的问卷情况
    const res3 = await queryTopic(queId, que_type)
    // 整理返回类型数据
    const newTopics = formatTopic(res3)
    const newData = formatQueTopIc(res2[0], newTopics, name)
    // console.log(newData);
    ctx.body = {
      code: 200,
      message: '查找某个学生填写情况',
      data: newData
    }
  }
  async queDetail(ctx, next) {
    const { id } = ctx.params
    // 根据问卷id查找对应的问卷
    const res = await queryQue(id, '101')
    const { name, que_type, respondents, author } = res[0]
    // 根据问卷类型和问卷id查找对应的题目
    const res2 = await queryTopic(id, que_type)
    // 整理题目类型
    const newTopics = formatTopicAddCount(res2, respondents)
    // 查找填写学生的平均分
    const res3 = await queryStudentAvg(id, que_type)
    const newRes = {
      id,
      name,
      que_type,
      overallAvg: res3[0].score,
      robotAvg: res3[0].robot_score,
      detail: newTopics
    }
    ctx.body = {
      code: 200,
      message: '查询问卷详情',
      data: newRes
    }
  }
  async queStar(ctx, next) {
    const { employee } = ctx.user
    const { que_id } = ctx.params
    // 获取对应的收藏问卷信息
    const res = await queryStarQue(employee, que_id)
    if (res.length) {
      //取消收藏
      await cancelStarQue(employee, que_id)
      ctx.body = {
        code: 200,
        message: '取消收藏成功',
        data: res
      }
    } else {
      //添加收藏
      await starQue(employee, que_id)
      ctx.body = {
        code: 200,
        message: '添加收藏成功',
        data: res
      }
    }
  }
  async queStarList(ctx, next) {
    const { employee } = ctx.user
    // 查询被收藏的所有问卷
    const res = await queryTeacherStarQue(employee)
    // 根据收藏问卷id查找对应的问卷
    const newArray = []
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        const res2 = await queryQue(res[i].que_id, '101')
        newArray.push(res2[0])
      }
    }
    ctx.body = {
      code: 200,
      message: '收藏问卷列表',
      data: newArray
    }
  }
  async teacherNameList(ctx,next){
    //查询教师字典, 因为只能管理员能发布问卷
    const res = await teacherNameList()
    //整理成树结构返回给前端
    const newRes = formatTreeSelect(res)
    ctx.body ={
      code: 200,
      message: '查询教师字典',
      data: newRes
    }
  }
}

module.exports = new TeacherControll()
