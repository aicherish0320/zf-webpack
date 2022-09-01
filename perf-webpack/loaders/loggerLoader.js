// loader 就是一个函数，接收一个内容，返回处理后的内容
function loggerLoader(source) {
  console.log('123 >>> ')
  return source
}

module.exports = loggerLoader
