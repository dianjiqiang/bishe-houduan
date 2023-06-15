function formatTopicType(type) {
  switch (String(type)) {
    case '1':
      return 'radio'
    case '2':
      return 'choice'
    case '3':
      return 'fill'
    case '4':
      return 'answer'
  }
}
function formatTopicTypeDesc(type) {
  switch (type) {
    case 'radio':
      return '1'
    case 'choice':
      return '2'
    case 'fill':
      return '3'
    case 'answer':
      return '4'
  }
}
function formatTopicOptions(item) {
  const newOption = []
  let newObject = null
  for (let i = 1; i <= 8; i++) {
    if (!item['option' + i]) {
      continue
    }
    newObject = {}
    newObject.value = 'option' + i + '_number'
    newObject.label = item['option' + i]
    newObject.score = item['option' + i + '_score']
    newObject['option' + i + '_number'] = item['option' + i + '_number']
    newOption.push(newObject)
  }
  return newOption
}

// 整理题目列表
function formatTopic(topics) {
  const newArray = []
  topics.forEach((item) => {
    const newObject = {}
    newObject.qid = item.que_number
    newObject.type = formatTopicType(item.top_type)
    newObject.title = item.name
    newObject.score = item.top_score
    newObject.value = ''
    if (newObject.type === 'radio' || newObject.type === 'choice') {
      newObject.options = formatTopicOptions(item)
    }
    newArray.push(newObject)
  })
  return newArray
}
// 整理学生提交的问卷
function formatSubmitData(data) {
  const newData = {}
  newData.queId = data.queId
  newData.studentId = data.studentId
  newData.score = data.score
  newData.robot_score = data.robot_score
  for (let i = 1; i <= data.topics.length; i++) {
    newData['topic' + i + '_value'] = data.topics[i - 1].value
  }
  return newData
}
// 整理教师发布的问卷题目
function formatTopicTeacher(topics, insertId) {
  const newArray = []
  topics.forEach((item) => {
    const newObject = {}
    newObject.que_id = insertId
    newObject.name = item.title
    newObject.top_type = formatTopicTypeDesc(item.type)
    newObject.que_number = item.qid
    newObject.top_score = item.score
    if (Array.isArray(item.options)) {
      item.options.map((item2, index) => {
        newObject['option' + (index + 1) + '_score'] = item2.score
        newObject['option' + (index + 1)] = item2.label
      })
    } else {
      newObject.option1_score = item.score
      newObject.option1 = item.title
    }
    newArray.push(newObject)
  })
  return newArray
}
// 整合学生提交的选项
function formatQueTopIc(options, topics, name) {
  const newObject = {}
  newObject.name = name
  newObject.score = options.score
  newObject.robotScore = options.robot_score
  const reg =
    /option1_number|option2_number|option3_number|option4_number|option5_number|option6_number|option7_number|option8_number/gi
  const reg2 = /\d+/g
  for (let i = 1; i <= 30; i++) {
    const value = options['topic' + i + '_value']
    const topic = topics[i - 1]
    if (!topic) {
      break
    }
    if (value?.slice?.(0,6) === 'option') {
      console.log(value);
      value.match(reg2).forEach((item) => {
        topics[i - 1].options[Number(item) - 1].checked = true
      })
    } else {
      topics[i - 1].value = value
    }
  }
  newObject.options = topics
  return newObject
}

function formatTopicOptionsAddCount(item, respondents) {
  const newOption = []
  let newObject = null
  for (let i = 1; i <= 8; i++) {
    if (!item['option' + i]) {
      continue
    }
    newObject = {}
    newObject.value = 'option' + i + '_number'
    newObject.label = item['option' + i]
    newObject.score = item['option' + i + '_score']
    newObject.proportion = (item['option' + i + '_number'] / respondents) * 100
    newObject['option' + i + '_number'] = item['option' + i + '_number']
    newOption.push(newObject)
  }
  return newOption
}

// 整理题目列表 + 次数
function formatTopicAddCount(topics, respondents) {
  const newArray = []
  topics.forEach((item) => {
    const newObject = {}
    newObject.qid = item.que_number
    newObject.type = formatTopicType(item.top_type)
    newObject.title = item.name
    newObject.score = item.top_score
    newObject.value = ''
    if (newObject.type === 'radio' || newObject.type === 'choice') {
      newObject.option = formatTopicOptionsAddCount(item, respondents)
    }
    newArray.push(newObject)
  })
  return newArray
}
// 将xx根据班级整理成树结构
function formatTreeSelect(data) {
  const newData = [
    {
      key: 1,
      title: '全体教师',
      value: 1,
      children: [
        {
          key: 2,
          title: '一年级组',
          value: 2,
          children: []
        },
        {
          key: 3,
          title: '二年级组',
          value: 3,
          children: []
        },
        {
          key: 4,
          title: '三年级组',
          value: 4,
          children: []
        },
      ]
    },
  ]
  data?.forEach(item => {
    if (item.class_id > 10) {
      newData[0].children[2].children.push({
        key: item.id,
        value: item.id,
        class_id: item.class_id,
        title: item.name,
      })
    }else if(item.class_id > 7){
      newData[0].children[1].children.push({
        key: item.id,
        value: item.id,
        class_id: item.class_id,
        title: item.name,
      })
    }else{
      newData[0].children[0].children.push({
        key: item.id,
        value: item.id,
        class_id: item.class_id,
        title: item.name,
      })
    }
  })
  return newData
}

module.exports = {
  formatTopic,
  formatSubmitData,
  formatTopicTeacher,
  formatQueTopIc,
  formatTopicAddCount,
  formatTreeSelect
}
