function readonly(target, key, descriptor) {
  // console.log(target)
  // console.log(key)
  // console.log(descriptor)
  descriptor.writable = false
}

class Circle {
  @readonly PI = 3.14
}

const c1 = new Circle()
c1.PI = 3.1415926

console.log('c1 >>> ', c1.PI)

/*
function Circle() {
  this.PI = 3.14
  Object.defineProperty(this, 'PI', 3.14)
}
*/
