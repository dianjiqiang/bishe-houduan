const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/user.middleware')
const { verifySelf } = require('../middleware/teacher.middleware')
const {
  list,
  queList,
  queryCharge,
  queryNeedQue,
  issue,
  deleteQue,
  studentTopic,
  queDetail,
  queStar,
  queStarList,
  teacherNameList
} = require('../controller/teacher.controll')

const teacherRouter = new KoaRouter({ prefix: '/teacher' })

teacherRouter.get('/list/:id', verifyAuth, list)
// 查询教师发布的所有问卷
teacherRouter.get('/que/list/:id', verifyAuth, queList)
// 查看对应年级班主任
teacherRouter.get('/charge/class/:id', verifyAuth, queryCharge)
// 查找需要完成的问卷数量
teacherRouter.get('/que/count/:id', verifyAuth, queryNeedQue)
// 教师发布问卷
teacherRouter.post('/que/issue/:type', verifyAuth, issue)
// 删除教师发布的问卷
teacherRouter.delete('/que/delete/:id', verifyAuth, verifySelf, deleteQue)
// 查询对应学生选择的对应问卷题目
teacherRouter.get('/que/student/topic', verifyAuth, studentTopic)
// 查询问卷填写详情
teacherRouter.get('/que/detail/:id', verifyAuth, queDetail)
// 添加收藏
teacherRouter.get('/que/star/:que_id', verifyAuth, queStar)
// 教师查看收藏列表
teacherRouter.get('/que/starlist', verifyAuth, queStarList)
// 管理员查看所有教师列表
teacherRouter.get('/query/teahcer/name/list',verifyAuth, teacherNameList)

module.exports = teacherRouter
