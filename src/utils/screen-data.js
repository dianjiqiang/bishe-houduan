function screenQue(needQue, alreadyQue) {
  const alreadyArray = []
  const newArray = []
  alreadyQue.forEach((item) => {
    alreadyArray.push(item.id)
  })
  needQue.forEach((item) => {
    if (alreadyArray.includes(item.id)) {
      return
    }
    newArray.push(item)
  })
  return newArray
}

module.exports = {
  screenQue
}
