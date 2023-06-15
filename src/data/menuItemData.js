const administrator = {
  role: 'administrator',
  MenuItem: [
    {
      title: '问卷列表',
      id: '/questionnaire',
      path: '/questionnaire',
      children: [
        {
          title: '问卷汇总',
          path: '/home/questionnaire/summary',
          id: '/home/questionnaire/summary'
        },
        {
          title: '收藏夹',
          path: '/home/questionnaire/favorites',
          id: '/home/questionnaire/favorites'
        }
      ]
    },
    {
      title: '教师列表',
      id: '/teachers',
      path: '/teachers',
      children: [
        {
          title: '一年级组',
          id: '/home/techers/seventh',
          path: '/home/techers/seventh'
        },
        {
          title: '二年级组',
          id: '/home/techers/eighth',
          path: '/home/techers/eighth'
        },
        {
          title: '三年级组',
          id: '/home/techers/ninth',
          path: '/home/techers/ninth'
        }
      ]
    },
    {
      title: '学生列表',
      id: '/students',
      path: '/students',
      children: [
        {
          title: '一年级组',
          id: '/home/students/seventh',
          path: '/home/students/seventh'
        },
        {
          title: '二年级组',
          id: '/home/students/eighth',
          path: '/home/students/eighth'
        },
        {
          title: '三年级组',
          id: '/home/students/ninth',
          path: '/home/students/ninth'
        }
      ]
    }
  ]
}
const firstGradeTeacher = {
  role: 'teacher',
  MenuItem: [
    {
      title: '问卷列表',
      id: '/questionnaire',
      path: '/questionnaire',
      children: [
        {
          title: '问卷汇总',
          path: '/home/questionnaire/summary',
          id: '/home/questionnaire/summary'
        },
        {
          title: '收藏夹',
          path: '/home/questionnaire/favorites',
          id: '/home/questionnaire/favorites'
        }
      ]
    },
    {
      title: '学生列表',
      id: '/students',
      path: '/students',
      children: [
        {
          title: '一年级组',
          id: '/home/students/seventh',
          path: '/home/students/seventh'
        }
      ]
    }
  ]
}
const secondGradeTeacher = {
  role: 'teacher',
  MenuItem: [
    {
      title: '问卷列表',
      id: '/questionnaire',
      path: '/questionnaire',
      children: [
        {
          title: '问卷汇总',
          path: '/home/questionnaire/summary',
          id: '/home/questionnaire/summary'
        },
        {
          title: '收藏夹',
          path: '/home/questionnaire/favorites',
          id: '/home/questionnaire/favorites'
        }
      ]
    },
    {
      title: '学生列表',
      id: '/students',
      path: '/students',
      children: [
        {
          title: '二年级组',
          id: '/home/students/eighth',
          path: '/home/students/eighth'
        }
      ]
    }
  ]
}
const gradeThreeTeacher = {
  role: 'teacher',
  MenuItem: [
    {
      title: '问卷列表',
      id: '/questionnaire',
      path: '/questionnaire',
      children: [
        {
          title: '问卷汇总',
          path: '/home/questionnaire/summary',
          id: '/home/questionnaire/summary'
        },
        {
          title: '收藏夹',
          path: '/home/questionnaire/favorites',
          id: '/home/questionnaire/favorites'
        }
      ]
    },
    {
      title: '学生列表',
      id: '/students',
      path: '/students',
      children: [
        {
          title: '三年级组',
          id: '/home/students/ninth',
          path: '/home/students/ninth'
        }
      ]
    }
  ]
}
const student = {
  role: 'student',
  MenuItem: [
    {
      title: '问卷列表',
      id: '/questionnaire',
      path: '/questionnaire',
      children: [
        {
          title: '问卷填写',
          path: '/home/questionnaire/fill',
          id: '/home/questionnaire/fill'
        }
      ]
    }
  ]
}

module.exports = {
  administrator,
  firstGradeTeacher,
  secondGradeTeacher,
  gradeThreeTeacher,
  student
}
