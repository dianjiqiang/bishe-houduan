const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'toupiao',
  user: 'root',
  password: 'Cxk@1on.cc',
  connectionLimit: 5 //表示我们最大创建连接池的数量是五个 如果发现创建多了 多创建的会被销毁掉
})

// 获取链接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log(err)
    return
  }
  // 获取connection 尝试和数据库建立一下链接
  connection.connect((err) => {
    if (err) {
      console.log('尝试和数据库交互失败', err)
    } else {
      console.log('和数据库交互成功')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
