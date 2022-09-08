const obj = {}
const ageVal = 10

Object.defineProperty(obj, 'age', {
  get() {
    return ageVal
  },
  set(newVal) {
    ageVal = newVal
  },
  enumerable: true, // for in
  configurable: true // delete
})

console.log(obj.age)
