const connection = require('../app/database')

class TeacherService {
  async list(id) {
    let statement = ``
    if (id >= 11) {
      statement = `SELECT * FROM teachers WHERE class_id >= 11;`
    } else if (id >= 8) {
      statement = `SELECT * FROM teachers WHERE class_id >=8 AND class_id < 11;`
    } else if (id >= 5) {
      statement = `SELECT * FROM teachers WHERE class_id >=5 AND class_id < 8;`
    }

    const [res] = await connection.execute(statement, [])
    return res
  }
  async queList(id) {
    let statement = `SELECT * FROM questionnaire WHERE author_number = ? ORDER BY createAt DESC;`
    if (id === '101') {
      statement = `SELECT * FROM questionnaire ORDER BY createAt DESC;`
    }

    const [res] = await connection.execute(statement, [id])
    return res
  }
  async queryCharge(id) {
    let statement = `SELECT * FROM teachers WHERE class_id = ? AND charge = '1';`

    const [res] = await connection.execute(statement, [id])
    return res
  }
  async queryNeedQue(id) {
    let statement = ``
    switch (id) {
      case '5':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%5%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '6':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%6%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '7':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%7%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '8':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%8%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '9':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%9%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '10':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%10%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '11':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%11%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
      case '12':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%12%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
      case '13':
        statement = `SELECT COUNT(*) count FROM questionnaire WHERE class_id LIKE '%13%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
    }
    const [res] = await connection.execute(statement)
    return res
  }
  // 新增问卷标题等内容
  async insertQueTitle(title, author, class_id, que_type, employee) {
    let statement = `INSERT INTO questionnaire (name, author, class_id, que_type, author_number) values (?, ?, ? , ?, ?);`

    const [res] = await connection.execute(statement, [title, author, Number(class_id), Number(que_type), employee])
    return res
  }
  async insertTopic(que_type, topic) {
    let statement = ``
    if (que_type === '1') {
      for (let i of topic) {
        const {
          name,
          que_id,
          que_number,
          top_type,
          top_score,
          option1,
          option1_score,
          option2 = null,
          option2_score = null,
          option3 = null,
          option3_score = null,
          option4 = null,
          option4_score = null,
          option5 = null,
          option5_score = null,
          option6 = null,
          option6_score = null,
          option7 = null,
          option7_score = null,
          option8 = null,
          option8_score = null
        } = i
        statement = `INSERT INTO topic_score (name, que_id, que_number, top_type, top_score,
           option1, option1_score, option2, option2_score, option3, option3_score, option4, option4_score, option5, option5_score,
           option6, option6_score, option7, option7_score, option8, option8_score) 
           values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
        await connection.execute(statement, [
          name,
          Number(que_id),
          Number(que_number),
          Number(top_type),
          Number(top_score),
          option1,
          Number(option1_score),
          option2,
          option2_score === null ? null : Number(option2_score),
          option3,
          option3_score === null ? null : Number(option3_score),
          option4,
          option4_score === null ? null : Number(option4_score),
          option5,
          option5_score === null ? null : Number(option5_score),
          option6,
          option6_score === null ? null : Number(option6_score),
          option7,
          option7_score === null ? null : Number(option7_score),
          option8,
          option8_score === null ? null : Number(option8_score)
        ])
      }
    } else {
      for (let i of topic) {
        const {
          name,
          que_id,
          que_number,
          top_type,
          option1,
          option2 = null,
          option3 = null,
          option4 = null,
          option5 = null,
          option6 = null,
          option7 = null,
          option8 = null
        } = i
        statement = `INSERT INTO topic_not_score (name, que_id, que_number, top_type,
           option1, option2, option3,option4, option5, option6, option7, option8) 
           values (?,?,?,?,?,?,?,?,?,?,?,?);`
        await connection.execute(statement, [
          name,
          Number(que_id),
          Number(que_number),
          Number(top_type),
          option1,
          option2,
          option3,
          option4,
          option5,
          option6,
          option7,
          option8
        ])
      }
    }
    return '添加成功'
  }
  // 查询教师发布问卷数量
  async queryTeacherQue(id) {
    let statement = `SELECT publish FROM teachers WHERE id = ?;`

    const [res] = await connection.execute(statement, [id])
    return res
  }
  async queryTeacherQueAuthor(id) {
    let statement = `SELECT publish FROM teachers WHERE employee = ?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async addTeacherQue(id, publish) {
    let statement = `UPDATE teachers SET publish = ? WHERE employee = ?`

    const [res] = await connection.execute(statement, [String(publish), id])
    return res
  }
  // 精确查找某个问卷
  async queryQue(id, employee) {
    let statement = `SELECT * FROM questionnaire WHERE author_number = ? AND id = ?;`
    if (employee === '101') {
      statement = `SELECT * FROM questionnaire WHERE id = ?;`

      const [res] = await connection.execute(statement, [id])
      return res
    }

    const [res] = await connection.execute(statement, [employee, id])
    return res
  }
  async deleteTopic(id, type) {
    let statement = ``
    if (type === 1) {
      statement = `DELETE FROM topic_score WHERE que_id = ?;`
    } else {
      statement = `DELETE FROM topic_not_score WHERE que_id = ?;`
    }
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async deleteQue(id) {
    let statement = `DELETE FROM questionnaire WHERE id = ?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async queryStudentTopic(queId, studentId, type) {
    let statement = `SELECT * FROM student_fill WHERE que_id = ? AND studentId = ?;`
    if (type !== 1) {
      statement = `SELECT * FROM student_fill_not_score WHERE que_id = ? AND studentId = ?;`
    }

    const [res] = await connection.execute(statement, [queId, studentId])
    return res
  }
  async queryTopic(queId, type) {
    let statement = `SELECT * FROM topic_score WHERE que_id = ? ORDER BY que_number ASC;`
    if (type !== 1) {
      statement = `SELECT * FROM topic_not_score WHERE que_id = ? ORDER BY que_number ASC;`
    }

    const [res] = await connection.execute(statement, [queId])
    return res
  }
  async queryStudentAvg(id, que_type) {
    let statement = `SELECT AVG(score) score, AVG(robot_score) robot_score FROM student_fill WHERE que_id = ?;`
    if (que_type !== 1) {
      statement = `SELECT AVG(robot_score) robot_score FROM student_fill_not_score WHERE que_id = ?;`
    }

    const [res] = await connection.execute(statement, [id])
    return res
  }
  async queryStarQue(id, que_id) {
    let statement = `SELECT * FROM que_star WHERE que_id = ? AND teacher_id = ?;`

    const [res] = await connection.execute(statement, [que_id, id])
    return res
  }
  async starQue(id, que_id) {
    let statement = `INSERT INTO que_star (que_id, teacher_id) values (?, ?);`
    const [res] = await connection.execute(statement, [que_id, id])
    return res
  }
  async cancelStarQue(id, que_id) {
    let statement = `DELETE FROM que_star WHERE que_id = ? AND teacher_id = ?;`
    const [res] = await connection.execute(statement, [que_id, id])
    return res
  }
  async queryTeacherStarQue(id) {
    let statement = `SELECT * FROM que_star WHERE teacher_id = ?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async reduceStudentCounter(id) {
    let statement = `UPDATE students SET finish_que = finish_que - 1 WHERE id = ?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  //查询教师名字列表
  async teacherNameList(){
    let statement = `SELECT name,id,class_id FROM teachers WHERE class_id != 1;`
    const [res] = await connection.execute(statement)
    return res
  }
  // 查询教师信息
  async queryTeacherMessage(teacherId){
    let statement = ``
    if(teacherId >= 6){
      statement = `SELECT * FROM teachers WHERE id = ?`
      const [res] = await connection.execute(statement, [teacherId])
      return res
    }else{
      if(teacherId === 1){
        statement = `SELECT * FROM teachers WHERE class_id > 4`
        const [res] = await connection.execute(statement)
        return res
      }else if(teacherId === 2){
        statement = `SELECT * FROM teachers WHERE class_id = 5 || class_id = 6 || class_id = 7`
        const [res] = await connection.execute(statement)
        return res
      }else if(teacherId === 3){
        statement = `SELECT * FROM teachers WHERE class_id = 8 || class_id = 9 || class_id = 10`
        const [res] = await connection.execute(statement)
        return res
      }else if(teacherId === 4){
        statement = `SELECT * FROM teachers WHERE class_id = 11 || class_id = 12 || class_id = 13`
        const [res] = await connection.execute(statement)
        return res 
      }
    }
  }
}

module.exports = new TeacherService()
