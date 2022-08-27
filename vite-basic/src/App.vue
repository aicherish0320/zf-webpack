<template>
  <div id="app">
    <HelloWorld msg="Vue3 + Vite"></HelloWorld>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'

const getUsers = async () => {
  const ret = await fetch('/api/users')
  const data = await ret.json()
}

getUsers()
</script>

<style>
#app {
  height: 100vh;
}
</style>
