const connection = require('../app/database')

class StudentService {
  async list(id) {
    // 如果id = 2 3 4 就选择其他查询语句
    let statement = ``
    if (id === 2 || id === '2') {
      statement = `SELECT * FROM students WHERE class_id = 5 || class_id = 6 || class_id = 7;`
      const [res] = await connection.execute(statement)
      return res
    }else if(id === 3 || id === '3'){
      statement = `SELECT * FROM students WHERE class_id = 8 || class_id = 9 || class_id = 10;`
      const [res] = await connection.execute(statement)
      return res
    }else if(id === 4 || id === '4'){
      statement = `SELECT * FROM students WHERE class_id = 11 || class_id = 12 || class_id = 13;`
      const [res] = await connection.execute(statement)
      return res
    }else{
      statement = `SELECT * FROM students WHERE class_id = ?;`
      const [res] = await connection.execute(statement, [id])
      return res
    }
  }
  async fill(id, type) {
    let statement = null
    if (type === '1') {
      statement = `SELECT * FROM topic_score WHERE que_id = ? ORDER BY que_number ASC;`
    } else {
      statement = `SELECT * FROM topic_not_score WHERE que_id = ? ORDER BY que_number ASC;`
    }
    const [res] = await connection.execute(statement, [Number(id)])
    return res
  }
  async submitScore(data) {
    const statement = `INSERT INTO student_fill (que_id, studentId, score,robot_score, topic1_value, topic2_value, topic3_value, topic4_value, topic5_value,
      topic6_value, topic7_value, topic8_value, topic9_value, topic10_value,
       topic11_value, topic12_value, topic13_value, topic14_value, topic15_value,
        topic16_value, topic17_value, topic18_value, topic19_value, topic20_value,
         topic21_value, topic22_value, topic23_value, topic24_value, topic25_value,
         topic26_value, topic27_value, topic28_value, topic29_value, topic30_value) 
         values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`

    const [res] = await connection.execute(statement, [
      Number(data.queId),
      data.studentId,
      Number(data.score),
      Number(data.robot_score),
      data.topic1_value || null,
      data.topic2_value || null,
      data.topic3_value || null,
      data.topic4_value || null,
      data.topic5_value || null,
      data.topic6_value || null,
      data.topic7_value || null,
      data.topic8_value || null,
      data.topic9_value || null,
      data.topic10_value || null,
      data.topic11_value || null,
      data.topic12_value || null,
      data.topic13_value || null,
      data.topic14_value || null,
      data.topic15_value || null,
      data.topic16_value || null,
      data.topic17_value || null,
      data.topic18_value || null,
      data.topic19_value || null,
      data.topic20_value || null,
      data.topic21_value || null,
      data.topic22_value || null,
      data.topic23_value || null,
      data.topic24_value || null,
      data.topic25_value || null,
      data.topic26_value || null,
      data.topic27_value || null,
      data.topic28_value || null,
      data.topic29_value || null,
      data.topic30_value || null
    ])

    return res
  }
  async submit(data) {
    const statement = `INSERT INTO student_fill_not_score (que_id, studentId,robot_score, topic1_value, topic2_value, topic3_value, topic4_value, topic5_value,
      topic6_value, topic7_value, topic8_value, topic9_value, topic10_value,
       topic11_value, topic12_value, topic13_value, topic14_value, topic15_value,
        topic16_value, topic17_value, topic18_value, topic19_value, topic20_value,
         topic21_value, topic22_value, topic23_value, topic24_value, topic25_value,
         topic26_value, topic27_value, topic28_value, topic29_value, topic30_value) 
         values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`

    const [res] = await connection.execute(statement, [
      data.queId,
      data.studentId,
      data.robot_score,
      data.topic1_value || null,
      data.topic2_value || null,
      data.topic3_value || null,
      data.topic4_value || null,
      data.topic5_value || null,
      data.topic6_value || null,
      data.topic7_value || null,
      data.topic8_value || null,
      data.topic9_value || null,
      data.topic10_value || null,
      data.topic11_value || null,
      data.topic12_value || null,
      data.topic13_value || null,
      data.topic14_value || null,
      data.topic15_value || null,
      data.topic16_value || null,
      data.topic17_value || null,
      data.topic18_value || null,
      data.topic19_value || null,
      data.topic20_value || null,
      data.topic21_value || null,
      data.topic22_value || null,
      data.topic23_value || null,
      data.topic24_value || null,
      data.topic25_value || null,
      data.topic26_value || null,
      data.topic27_value || null,
      data.topic28_value || null,
      data.topic29_value || null,
      data.topic30_value || null
    ])
    return res
  }
  async fillNumber(id, option, number, type) {
    if (!id || !option || !number) {
      return
    }
    let statement = ``
    if (type) {
      switch (option) {
        case 'option1_number':
          statement = `UPDATE topic_not_score SET option1_number = ? WHERE id = ?;`
          break
        case 'option2_number':
          statement = `UPDATE topic_not_score SET option2_number = ? WHERE id = ?;`
          break
        case 'option3_number':
          statement = `UPDATE topic_not_score SET option3_number = ? WHERE id = ?;`
          break
        case 'option4_number':
          statement = `UPDATE topic_not_score SET option4_number = ? WHERE id = ?;`
          break
        case 'option5_number':
          statement = `UPDATE topic_not_score SET option5_number = ? WHERE id = ?;`
          break
        case 'option6_number':
          statement = `UPDATE topic_not_score SET option6_number = ? WHERE id = ?;`
          break
        case 'option7_number':
          statement = `UPDATE topic_not_score SET option7_number = ? WHERE id = ?;`
          break
        case 'option8_number':
          statement = `UPDATE topic_not_score SET option8_number = ? WHERE id = ?;`
          break
        default:
          break
      }
    } else {
      switch (option) {
        case 'option1_number':
          statement = `UPDATE topic_score SET option1_number = ? WHERE id = ?;`
          break
        case 'option2_number':
          statement = `UPDATE topic_score SET option2_number = ? WHERE id = ?;`
          break
        case 'option3_number':
          statement = `UPDATE topic_score SET option3_number = ? WHERE id = ?;`
          break
        case 'option4_number':
          statement = `UPDATE topic_score SET option4_number = ? WHERE id = ?;`
          break
        case 'option5_number':
          statement = `UPDATE topic_score SET option5_number = ? WHERE id = ?;`
          break
        case 'option6_number':
          statement = `UPDATE topic_score SET option6_number = ? WHERE id = ?;`
          break
        case 'option7_number':
          statement = `UPDATE topic_score SET option7_number = ? WHERE id = ?;`
          break
        case 'option8_number':
          statement = `UPDATE topic_score SET option8_number = ? WHERE id = ?;`
          break
        default:
          break
      }
    }
    const [res] = await connection.execute(statement, [number, id])

    return res
  }
  async queryQue(id) {
    let statement = `SELECT * FROM questionnaire WHERE id = ?;`
    const [res] = await connection.execute(statement, [id])

    return res
  }
  async addQueNumber(id, number, que_student) {
    let statement = `UPDATE questionnaire SET respondents = ?,que_student = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [number, String(que_student), Number(id)])

    return res
  }
  async queryStudentQue(id) {
    let statement = `SELECT * FROM students WHERE id = ?;`
    const [res] = await connection.execute(statement, [id])

    return res
  }
  async addStudentQue(id, finish_que) {
    let statement = `UPDATE students SET finish_que = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [finish_que, id])

    return res
  }
  async queryNeedQue(id) {
    let statement = ``
    switch (id) {
      case '5':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%5%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '6':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%6%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '7':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%7%' OR class_id = 1 OR class_id LIKE '%2%';`
        break
      case '8':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%8%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '9':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%9%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '10':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%10%' OR class_id = 1 OR class_id LIKE '%3%';`
        break
      case '11':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%11%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
      case '12':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%12%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
      case '13':
        statement = `SELECT * FROM questionnaire WHERE class_id LIKE '%13%' OR class_id = 1 OR class_id LIKE '%4%';`
        break
    }
    const [res] = await connection.execute(statement)
    return res
  }
  async queryAlreadyQue(id) {
    let statement = `SELECT * FROM questionnaire WHERE que_student LIKE ?;`
    const [res] = await connection.execute(statement, ['%' + id + '%'])

    return res
  }
  async queryStudent(id) {
    let statement = `SELECT * FROM students WHERE studentId = ?;`
    const [res] = await connection.execute(statement, [id])

    return res
  }
}

module.exports = new StudentService()
