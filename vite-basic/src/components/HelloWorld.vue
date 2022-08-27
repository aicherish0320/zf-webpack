<template>
  <p>
    <div>{{msg}}</div>
    <div class="box"></div>
  </p>
</template>

<script setup>
defineProps(['msg'])
// import style from './HelloWorld.module.css'
// console.log('style >>> ', style)
</script>

<!-- <style module>
p {
  color: red;
}
.font {
  font-size: 60px;
}
</style> -->

<style lang="scss" scoped>
$color: pink;
p {
  color: $color;
}
.box  {
  width: 100px;
  height: 50px;
  background: cyan;
  transform: translateZ(45deg);
}
</style>
