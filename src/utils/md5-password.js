const md5 = require('blueimp-md5')

function md5password(password) {
  const md5psw = md5(md5(password) + '_config_password')

  return md5psw
}

module.exports = {
  md5password
}
