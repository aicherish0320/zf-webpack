// console.log(Object.prototype.toString.call('foo')) // [object String]
// console.log(Object.prototype.toString.call([])) // [object Array]
// console.log(Object.prototype.toString.call(true)) // [object Boolean]
// console.log(Object.prototype.toString.call(123)) // [object Number]
// console.log(Object.prototype.toString.call(null)) // [object Null]

const myExports = {}
// 为了更进一步区分不同的 Object 对象类型
Object.defineProperty(myExports, Symbol.toStringTag, { value: 'Module' })
console.log(Object.prototype.toString.call(myExports))
